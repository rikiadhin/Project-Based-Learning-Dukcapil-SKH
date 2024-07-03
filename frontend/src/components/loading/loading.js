export const Loading = () => {
     return (
          <div className="hero is-fullheight is-flex is-align-items-center" style={{
               position: 'fixed',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               background: 'white',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               zIndex: 1000
          }}>
               <div className="hero-body has-text-centered">
                    <img
                         src={require("../../assets/gif/loading4.gif")}
                         alt="Loading..."
                         style={{
                              width: "100px",
                              height: "100px",
                         }}
                    /> 
               </div>
          </div>
     );
}