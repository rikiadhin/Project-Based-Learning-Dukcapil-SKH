import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
     MRT_EditActionButtons,
     MaterialReactTable,
     useMaterialReactTable,
} from "material-react-table";
import {
     Menu,
     MenuItem,
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
import { utils, writeFile } from "xlsx";  
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from 'axios';
import { encryptId } from "../../utils/Enskripsi";

//CREATE hook (post new user to api)
function useCreateUser() {
     const queryClient = useQueryClient();
     const apiUrl = process.env.REACT_APP_API_URL;
     return useMutation({
          mutationFn: async (newUserInfo) => {
               const response = await fetch(
                    `${apiUrl}/petugasPerekaman`,
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
     const token = localStorage.getItem('token');
     return useQuery({
          queryKey: ["users"],
          queryFn: async () => {
               const response = await fetch(`${apiUrl}/terlapors`, {
                    headers: {
                         'token': token
                    }
               });
               const selectedData = await response.json();
               const data = await selectedData.map((item) => ({
                    id: item?.id,
                    namaPelapor: item?.Pelapor?.namaPelapor,
                    nomorNIK: item?.Pelapor?.nomorNIK,
                    nomorWA: item?.Pelapor?.nomorWA,
                    statusHubungan: item?.Pelapor?.Hubungan?.statusHubungan,
                    jenisKelamin:item?.JenisKelamin?.jenisKelamin,
                    namaTerlapor: item?.namaTerlapor,
                    tempatLahir: item?.tempatLahir,
                    tanggalLahir: item?.tanggalLahir,
                    namaAyahKandung: item?.namaAyahKandung,
                    namaIbuKandung: item?.namaIbuKandung,
                    alamat:
                         item?.alamat +
                         ", " +
                         item?.Kelurahan?.namaKelurahan +
                         ", " +
                         item?.Kelurahan?.Kecamatan?.namaKecamatan,
                    kelurahan : item?.Kelurahan?.namaKelurahan,
                    kecamatan : item?.Kelurahan?.Kecamatan?.namaKecamatan,
                    kerentanan: item?.TerlaporRentans.map(
                         (item) => item.Kerentanan.namaKerentanan
                    ).join(", "),
                    kebutuhanKhusus: item?.TerlaporKhusus.map(
                         (item) => item.KebutuhanKhusu.namaKebutuhanKhusus
                    ).join(", "),
                    tanggalPelaporan: item?.Pelaporan?.tanggalPelaporan,
                    statusLayanan: item?.Pelaporan?.statusLayanan,
               }));
               console.log("ini data : ", data);
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
                    `${apiUrl}/petugasPerekaman/${user.id}`,
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
               const response = await Promise.all([
                    axios.delete(`${apiUrl}/pelapor/${userId}`),
                    axios.delete(`${apiUrl}/terlapor/${userId}`),
                    axios.delete(`${apiUrl}/perekaman/${userId}`)
               ]);
               return;
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

const Example = () => {
     const [validationErrors, setValidationErrors] = useState({});
     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
     const [rowToDelete, setRowToDelete] = useState(null);
     const [anchorEl, setAnchorEl] = useState(null);
     const open = Boolean(anchorEl);

     const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
     };

     const handleClose = () => {
          setAnchorEl(null);
     };

     const columns = useMemo(
          () => [
               {
                    accessorKey: "namaPelapor",
                    header: "Nama Pelapor",
                    muiEditTextFieldProps: {
                         required: true,
                         error: !!validationErrors?.namaPelapor,
                         helperText: validationErrors?.namaPelapor,
                         onFocus: () =>
                              setValidationErrors({
                                   ...validationErrors,
                                   namaPelapor: undefined,
                              }),
                    },
               },
               {
                    accessorKey: "nomorWA",
                    header: "Nomor WhatsApp",
                    muiEditTextFieldProps: {
                         required: true,
                         error: !!validationErrors?.nomorWA,
                         helperText: validationErrors?.nomorWA,
                         onFocus: () =>
                              setValidationErrors({
                                   ...validationErrors,
                                   nomorWA: undefined,
                              }),
                    },
               },
               {
                    accessorKey: "namaTerlapor",
                    header: "Nama Terlapor",
                    muiEditTextFieldProps: {
                         required: true,
                         error: !!validationErrors?.namaTerlapor,
                         helperText: validationErrors?.namaTerlapor,
                         onFocus: () =>
                              setValidationErrors({
                                   ...validationErrors,
                                   namaTerlapor: undefined,
                              }),
                    },
               },
               {
                    accessorKey: "kecamatan",
                    header: "Kecamatan",
                    muiEditTextFieldProps: {
                         required: true,
                         error: !!validationErrors?.kecamatan,
                         helperText: validationErrors?.kecamatan,
                         onFocus: () =>
                              setValidationErrors({
                                   ...validationErrors,
                                   kecamatan: undefined,
                              }),
                    },
               },
               {
                    accessorFn: (originalRow) => new Date(originalRow.tanggalPelaporan),
                    accessorKey: "tanggalPelaporan",
                    header: "Waktu",
                    filterVariant: "date-range",
                    Cell: ({ cell }) =>
                         `${cell.getValue().toLocaleDateString()} ${cell
                              .getValue()
                              .toLocaleTimeString()}`,
                    muiEditTextFieldProps: {
                         required: true,
                         error: !!validationErrors?.tanggalPelaporan,
                         helperText: validationErrors?.tanggalPelaporan,
                         onFocus: () =>
                              setValidationErrors({
                                   ...validationErrors,
                                   tanggalPelaporan: undefined,
                              }),
                    },
               },
               {
                    accessorKey: "statusLayanan",
                    header: "Status Layanan",
                    // filterVariant: "select",
                    muiEditTextFieldProps: {
                         required: true,
                         error: !!validationErrors?.statusLayanan,
                         helperText: validationErrors?.statusLayanan,
                         onFocus: () =>
                              setValidationErrors({
                                   ...validationErrors,
                                   statusLayanan: undefined,
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

     const handleExportDataToExcel = () => {
          // Menentukan header kolom
          const headers = [
               "No.",
               "Nama Pelapor",
               "Nomor NIK",
               "Nomor WhatsApp",
               "Status Hubungan",

               "Nama Terlapor",
               "Jenis Kelamin",
               "Tempat Lahir",
               "Tanggal Lahir",
               "Nama Ayah Kandung",
               "Nama Ibu Kandung",
               "Alamat",
               "Kerentanan",
               "Kebutuhan Khusus",
               "Tanggal Pelaporan",
               "Status Layanan",
          ];

          // Mengubah data menjadi array 2 dimensi dengan header
          const dataWithHeader = [
               headers,
               ...fetchedUsers.map((item, index) => [
                    index + 1,
                    item.namaPelapor,
                    item.nomorNIK,
                    item.nomorWA,
                    item.statusHubungan,
                    // data terlapor
                    item.namaTerlapor,
                    item.jenisKelamin,
                    item.tempatLahir,
                    dayjs(item.tanggalLahir)
                         .locale("id")
                         .format("DD MMMM YYYY"),
                    item.namaAyahKandung,
                    item.namaIbuKandung,
                    item.alamat,
                    item.kerentanan,
                    item.kebutuhanKhusus,
                    dayjs(item.tanggalPelaporan)
                         .locale("id")
                         .format("HH:mm:ss DD MMMM YYYY"),
                    item.statusLayanan,
               ]),
          ];
          // Konversi data ke dalam format worksheet
          const ws = utils.aoa_to_sheet(dataWithHeader);
          const columnWidths = [
               { width: 5 },
               { width: 20 },
               { width: 20 },
               { width: 20 },
               { width: 25 },
               { width: 15 },
               { width: 25 },
               { width: 25 },
               { width: 25 },
               { width: 25 },
               { width: 25 },
               { width: 25 },
               { width: 25 },
               { width: 25 },
               { width: 25 },
          ];
          ws["!cols"] = columnWidths;

          // Buat workbook dan tambahkan worksheet
          const wb = utils.book_new();
          utils.book_append_sheet(wb, ws, "Data Sheet");
          writeFile(wb, "Data_Make_Petan_Tuma.xlsx");
     };

     const handleExportSelectedToExcel = (selectedRows) => {
          // Menentukan header kolom
          const headers = [
               "No.",
               "Nama Pelapor",
               "Nomor NIK",
               "Nomor WhatsApp",
               "Status Hubungan",
               "Nama Terlapor",
               "Tempat Lahir",
               "Tanggal Lahir",
               "Nama Ayah Kandung",
               "Nama Ibu Kandung",
               "Alamat",
               "Kerentanan",
               "Kebutuhan Khusus",
               "Tanggal Pelaporan",
               "Status Layanan",
          ];

          // Mengubah data menjadi array 2 dimensi dengan header
          const dataWithHeader = [
               headers,
               ...selectedRows.map((row, index) => {
                    const item = row.original;
                    return [
                         index + 1,
                         item.namaPelapor,
                         item.nomorNIK,
                         item.nomorWA,
                         item.statusHubungan,
                         item.namaTerlapor,
                         item.tempatLahir,
                         dayjs(item.tanggalLahir).locale("id").format("DD MMMM YYYY"),
                         item.namaAyahKandung,
                         item.namaIbuKandung,
                         item.alamat,
                         item.kerentanan,
                         item.kebutuhanKhusus,
                         dayjs(item.tanggalPelaporan).locale("id").format("HH:mm:ss DD MMMM YYYY"),
                         item.statusLayanan,
                    ];
               })
          ];

          // Konversi data ke dalam format worksheet
          const ws = utils.aoa_to_sheet(dataWithHeader);
          const columnWidths = [
               { width: 5 },
               { width: 20 },
               { width: 20 },
               { width: 20 },
               { width: 25 },
               { width: 15 },
               { width: 25 },
               { width: 25 },
               { width: 25 },
               { width: 25 },
               { width: 25 },
               { width: 25 },
               { width: 25 },
               { width: 25 },
               { width: 25 },
          ];
          ws["!cols"] = columnWidths;

          // Buat workbook dan tambahkan worksheet
          const wb = utils.book_new();
          utils.book_append_sheet(wb, ws, "Data Sheet");
          writeFile(wb, "Data_Make_Petan_Tuma.xlsx");
     };

     const table = useMaterialReactTable({
          columns,
          data: fetchedUsers,
          columnFilterDisplayMode: 'popover',
          createDisplayMode: "modal",
          editDisplayMode: "modal",
          enableEditing: true,
          enableRowSelection: true,
          // paginationDisplayMode: "pages",
          getRowId: (row) => row.id,
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
                    <DialogTitle variant="h3">Create New User</DialogTitle>
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
                    <DialogTitle variant="h3">Edit User</DialogTitle>
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
                    <Tooltip title="Detail">
                         <IconButton
                              color="primary"
                              component={Link}
                              // onClick={() => table.setEditingRow(row)}
                              to={`/dashboard/detail-pelaporan/${encryptId(row.original.id)}`}
                         >
                              <VisibilityIcon />
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
               <Box
                    sx={{
                         display: "flex",
                         gap: "16px",
                         padding: "8px",
                         flexWrap: "wrap",
                    }}
               >
                    <Tooltip title="Export All Data">
                         <Button
                              variant="outlined"
                              color="success"
                              onClick={() => {
                                   handleExportDataToExcel();
                                   handleClose();
                              }}
                              startIcon={<FileDownloadOutlinedIcon />}
                         >
                              Export All Data
                         </Button>
                    </Tooltip>
                    <Tooltip title="Export Selected Rows">
                         <Button
                              disabled={
                                   !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
                              }
                              color="primary"
                              onClick={() => handleExportSelectedToExcel(table.getSelectedRowModel().rows)}
                              startIcon={<FileDownloadOutlinedIcon />}
                         >
                              Export Selected Rows
                         </Button>
                    </Tooltip>
               </Box>
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
               <Dialog
                    open={deleteDialogOpen}
                    onClose={() => setDeleteDialogOpen(false)}
               >
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                         Are you sure you want to delete this user ?
                    </DialogContent>
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

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
     //Put this with your other react-query providers near root of your app
     <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
               <Example />
          </LocalizationProvider>
     </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value.length;

function validateUser(user) {
     return {
          namaTerlapor: !validateRequired(user.namaTerlapor)
               ? "Nama Petugas is Required"
               : "",
          namaPelapor: !validateRequired(user.namaPelapor)
               ? "Nomor WhatsApp is Required"
               : "",
     };
}
