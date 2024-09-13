// Define the form values that will be collected from the user
export interface SignupFormValues {
    firstName: string;
    lastName: string;
    username: string;
    email: string; // Match with the backend expected field
    password: string;
    adresse: string;
    telephone: string;
    role: string;
  }
  
  // Define the user data format expected by the backend
  export interface UserData {
    firstName: string;
    lastName: string;
    username: string;
    email: string; // Use the same field name as SignupFormValues
    password: string;
    adresse: string;
    telephone: string;
    role: string;
  }
  
  // Define the expected response from the signup API
  export interface SignupResponse {
    token: string;
  }
  
  export interface LoginResponse {
    token: string;
    // Add other fields if needed
  }
  