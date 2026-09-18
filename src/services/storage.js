// Storage Service for Multi-Project SEO Database

const PROJECTS_KEY = 'authority_pulse_projects_v1';
const CURRENT_PROJECT_ID_KEY = 'authority_pulse_current_project';
const API_KEYS_KEY = 'authority_pulse_api_keys_v1';

export const storageService = {
  // Get all projects
  getProjects: () => {
    try {
      const data = localStorage.getItem(PROJECTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Failed to read projects from storage', err);
      return [];
    }
  },

  // Save/Update a single project
  saveProject: (project) => {
    try {
      const projects = storageService.getProjects();
      const existingIndex = projects.findIndex(p => p.id === project.id);
      
      const updatedProject = {
        ...project,
        updatedAt: new Date().toISOString()
      };

      if (existingIndex >= 0) {
        projects[existingIndex] = updatedProject;
      } else {
        projects.unshift(updatedProject);
      }

      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
      return updatedProject;
    } catch (err) {
      console.error('Failed to save project', err);
      throw err;
    }
  },

  // Get project by ID
  getProjectById: (id) => {
    const projects = storageService.getProjects();
    return projects.find(p => p.id === id) || null;
  },

  // Delete project
  deleteProject: (id) => {
    try {
      const projects = storageService.getProjects().filter(p => p.id !== id);
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
      
      const currentId = localStorage.getItem(CURRENT_PROJECT_ID_KEY);
      if (currentId === id) {
        localStorage.removeItem(CURRENT_PROJECT_ID_KEY);
      }
      return true;
    } catch (err) {
      console.error('Failed to delete project', err);
      return false;
    }
  },

  // Set current active project ID
  setCurrentProjectId: (id) => {
    localStorage.setItem(CURRENT_PROJECT_ID_KEY, id);
  },

  // Get current active project ID
  getCurrentProjectId: () => {
    return localStorage.getItem(CURRENT_PROJECT_ID_KEY);
  },

  // API Key management (e.g. Gemini AI Key, DataForSEO, etc.)
  getApiKeys: () => {
    try {
      const keys = localStorage.getItem(API_KEYS_KEY);
      return keys ? JSON.parse(keys) : { geminiKey: '', dataForSeoKey: '' };
    } catch (err) {
      return { geminiKey: '', dataForSeoKey: '' };
    }
  },

  saveApiKeys: (keys) => {
    localStorage.setItem(API_KEYS_KEY, JSON.stringify(keys));
  }
};
