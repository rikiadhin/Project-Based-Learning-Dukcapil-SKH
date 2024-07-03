import { useMemo, useState } from "react";
import {
     MRT_EditActionButtons,
     MaterialReactTable,
     useMaterialReactTable,
} from "material-react-table";
import {
     Box,
     Button,
     Dialog,
     DialogActions,
     DialogContent,
     DialogTitle,
     IconButton,
     Tooltip,
} from "@mui/material";
import {
     QueryClient,
     QueryClientProvider,
     useMutation,
     useQuery,
     useQueryClient,
} from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Example = () => {
     const [validationErrors, setValidationErrors] = useState({});
     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
     const [rowToDelete, setRowToDelete] = useState(null);

     const columns = useMemo(
          () => [
               {
                    accessorKey: "id",
                    header: "Id",
                    enableEditing: false,
                    size: 80,
               },
               {
                    accessorKey: "namaKerentanan",
                    header: "Nama Kerentanan",
                    muiEditTextFieldProps: {
                         required: true,
                         error: !!validationErrors?.namaKerentanan,
                         helperText: validationErrors?.namaKerentanan,
                         //remove any previous validation errors when user focuses on the input
                         onFocus: () =>
                              setValidationErrors({
                                   ...validationErrors,
                                   namaKerentanan: undefined,
                              }),
                    },
               },
          ],
          [validationErrors]
     );

     //call CREATE hook
     const { mutateAsync: createUser, isPending: isCreatingUser } =
          useCreateUser();
     //call READ hook
     const {
          data: fetchedUsers = [],
          isError: isLoadingUsersError,
          isFetching: isFetchingUsers,
          isLoading: isLoadingUsers,
     } = useGetUsers();
     //call UPDATE hook
     const { mutateAsync: updateUser, isPending: isUpdatingUser } =
          useUpdateUser();
     //call DELETE hook
     const { mutateAsync: deleteUser, isPending: isDeletingUser } =
          useDeleteUser();

     //CREATE action
     const handleCreateUser = async ({ values, table }) => {
          const newValidationErrors = validateUser(values);
          if (Object.values(newValidationErrors).some((error) => error)) {
               setValidationErrors(newValidationErrors);
               return;
          }
          setValidationErrors({});
          await createUser(values);
          table.setCreatingRow(null); //exit creating mode
     };

     //UPDATE action
     const handleSaveUser = async ({ values, table }) => {
          const newValidationErrors = validateUser(values);
          if (Object.values(newValidationErrors).some((error) => error)) {
               setValidationErrors(newValidationErrors);
               return;
          }
          setValidationErrors({});
          await updateUser(values);
          table.setEditingRow(null); //exit editing mode
     };

     const handleDeleteUser = async () => {
          await deleteUser(rowToDelete.original.id);
          setDeleteDialogOpen(false);
          setRowToDelete(null);
     };

     const openDeleteConfirmModal = (row) => {
          setRowToDelete(row);
          setDeleteDialogOpen(true);
     };

     const table = useMaterialReactTable({
          columns,
          data: fetchedUsers,
          createDisplayMode: "modal",
          editDisplayMode: "modal",
          enableEditing: true,
          getRowId: (row) => row.id,
          initialState: {
               pagination: {
                    pageSize: 5, // Set the initial page size to 5
               },
          },
          muiToolbarAlertBannerProps: isLoadingUsersError
               ? {
                    color: "error",
                    children: "Error loading data",
               }
               : undefined,
          muiTableContainerProps: {
               sx: {
                    minHeight: "500px",
               },
          },
          onCreatingRowCancel: () => setValidationErrors({}),
          onCreatingRowSave: handleCreateUser,
          onEditingRowCancel: () => setValidationErrors({}),
          onEditingRowSave: handleSaveUser,
          //optionally customize modal content
          renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
               <>
                    <DialogTitle variant="h3">Create New Data</DialogTitle>
                    <DialogContent
                         sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                    >
                         {internalEditComponents} {/* or render custom edit components here */}
                    </DialogContent>
                    <DialogActions>
                         <MRT_EditActionButtons variant="text" table={table} row={row} />
                    </DialogActions>
               </>
          ),
          //optionally customize modal content
          renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
               <>
                    <DialogTitle variant="h3">Edit Data</DialogTitle>
                    <DialogContent
                         sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
                    >
                         {internalEditComponents} {/* or render custom edit components here */}
                    </DialogContent>
                    <DialogActions>
                         <MRT_EditActionButtons variant="text" table={table} row={row} />
                    </DialogActions>
               </>
          ),

          renderRowActions: ({ row, table }) => (
               <Box sx={{ display: "flex", gap: "1rem" }}>
                    <Tooltip title="Edit">
                         <IconButton color="primary" onClick={() => table.setEditingRow(row)}>
                              <EditIcon />
                         </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                         <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                              <DeleteIcon />
                         </IconButton>
                    </Tooltip>
               </Box>
          ),
          renderTopToolbarCustomActions: ({ table }) => (
               <Button
                    variant="contained"
                    onClick={() => {
                         table.setCreatingRow(true);
                    }}
               >
                    Create New Data
               </Button>
          ),
          state: {
               isLoading: isLoadingUsers,
               isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
               showAlertBanner: isLoadingUsersError,
               showProgressBars: isFetchingUsers,
          },
     });

     return (
          <>
               <MaterialReactTable table={table} />
               <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>Are you sure you want to delete this user?</DialogContent>
                    <DialogActions>
                         <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                         <Button color="error" onClick={handleDeleteUser}>
                              Delete
                         </Button>
                    </DialogActions>
               </Dialog>
          </>
     ); 
};

//CREATE hook (post new user to api)
function useCreateUser() {
     const queryClient = useQueryClient();
     const apiUrl = process.env.REACT_APP_API_URL;
     return useMutation({
          mutationFn: async (newUserInfo) => {
               const response = await fetch(
                    `${apiUrl}/kerentanan`,
                    {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify(newUserInfo),
                    }
               );
               if (!response.ok) {
                    throw new Error("Network response was not ok");
               }
               return response.json();
          },
          // client side optimistic update
          onMutate: async (newUserInfo) => {
               await queryClient.cancelQueries({ queryKey: ["users"] });

               const previousUsers = queryClient.getQueryData(["users"]);

               queryClient.setQueryData(["users"], (prevUsers) => [
                    ...(prevUsers || []),
                    {
                         ...newUserInfo,
                         id: (Math.random() + 1).toString(36).substring(7),
                    },
               ]);

               return { previousUsers };
          },
          onError: (err, newUserInfo, context) => {
               if (context?.previousUsers) {
                    queryClient.setQueryData(["users"], context.previousUsers);
               }
          },
          onSettled: () => {
               queryClient.invalidateQueries({ queryKey: ["users"] });
          },
     });
}

//READ hook (get users from api)
function useGetUsers() {
     const apiUrl = process.env.REACT_APP_API_URL;
     return useQuery({
          queryKey: ["users"],
          queryFn: async () => {
               const response = await fetch(
                    `${apiUrl}/kerentanans`
               );
               const data = await response.json();
               return data;
          },
          refetchOnWindowFocus: false,
     });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
     const queryClient = useQueryClient();
     const apiUrl = process.env.REACT_APP_API_URL;
     return useMutation({
          mutationFn: async (user) => {
               const response = await fetch(
                    `${apiUrl}/kerentanan/${user.id}`,
                    {
                         method: "PATCH", // atau 'PATCH' tergantung pada API Anda
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify(user),
                    }
               );
               if (!response.ok) {
                    throw new Error("Network response was not ok");
               }
               return response.json();
          },
          onMutate: (newUserInfo) => {
               queryClient.setQueryData(["users"], (prevUsers) =>
                    prevUsers?.map((prevUser) =>
                         prevUser.id === newUserInfo.id ? newUserInfo : prevUser
                    )
               );
          },
          onSettled: () => queryClient.invalidateQueries({ queryKey: ["users"] }), // refetch users after mutation
     });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
     const queryClient = useQueryClient();
     const apiUrl = process.env.REACT_APP_API_URL;
     return useMutation({
          mutationFn: async (userId) => {
               const response = await fetch(
                    `${apiUrl}/kerentanan/${userId}`,
                    {
                         method: "DELETE",
                    }
               );
               if (!response.ok) {
                    throw new Error("Network response was not ok");
               }
               return response.json();
          },
          // client side optimistic update
          onMutate: (userId) => {
               const previousUsers = queryClient.getQueryData(["users"]);

               queryClient.setQueryData(["users"], (prevUsers) =>
                    prevUsers?.filter((user) => user.id !== userId)
               );

               return { previousUsers };
          },
          onError: (err, userId, context) => {
               queryClient.setQueryData(["users"], context.previousUsers);
          },
          onSettled: () => {
               queryClient.invalidateQueries({ queryKey: ["users"] });
          },
     });
}

const queryClient = new QueryClient();

const TableKerentanan = () => (
     //Put this with your other react-query providers near root of your app
     <QueryClientProvider client={queryClient}>
          <Example />
     </QueryClientProvider>
);

export default TableKerentanan;

const validateRequired = (value) => !!value.length;

function validateUser(user) {
     return {
          namaKerentanan: !validateRequired(user.namaKerentanan)
               ? "Nama Kerentanan is Required"
               : "",
     };
}
