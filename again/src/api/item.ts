import axios from "axios";

const BASE_URL = "http://localhost:8000";

export interface FileHierarchyItem{
    name: string,
    type: "file" | "dir" 
}

export interface Call{
  func_token: string;
  inputs: string []; // (parent type ( file , function) , token(either file or class))
}

export interface Variable{
  token: string;
  points_to: Call | string; // string
}

export interface Func {
  token: string; // Name of the function
  parent: [string, string]; // A tuple with (parent type, token)
  process: Array<Call | Variable | string>; // A list of 'Call', 'Variable', or string
}


export interface Class {
  token: string;
  function_list: Array<Func>;
}


export interface FileItem {
  token: string;
  path: string;
  function_list: Array<Func>;
  class_list: Array<Class>;
}


// Create an Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Optional: Add a timeout for requests
});

// Fetch File item from FastAPI
export const fetchAllFileItems = async (token_name: string): Promise<Record<string, FileItem> > => {
  try {
    const response = await apiClient.get<Record<string, FileItem> >(`/file/${token_name}`);
    return response.data; // Return the fetched items
  } catch (error: any) {
    console.error("Error fetching items:", error.message || error);
    throw new Error("Failed to fetch file items. Please try again later.");
  }
};
