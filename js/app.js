let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json");


const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();
  
    auth0 = await createAuth0Client({
      domain: config.domain,
      client_id: config.clientId
    });
  };


  window.onload = async () => {
    await configureClient();
  

  updateUI();

  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {

    return;
  }

  // NEW - check for the code and state parameters
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {

    // Process the login state
    await auth0.handleRedirectCallback();
    
    updateUI();

    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
};

// NEW


const updateUI = async () => {
 let  gate=document.getElementById("gated-content")
  const isAuthenticated = await auth0.isAuthenticated();

 document.querySelector(".login").disabled =isAuthenticated;

 if (isAuthenticated) {
console.log(gate);
document.getElementById("gated-content").classList.remove("hidden");

}

else {
     document.getElementById("gated-content").classList.add("hidden");
 }


};

const login = async () => {
    await auth0.loginWithRedirect({
      redirect_uri: window.location.origin
    });
  };

  const logout = () => {
    auth0.logout({
      returnTo: "http://127.0.0.1:5500"
    });
  };