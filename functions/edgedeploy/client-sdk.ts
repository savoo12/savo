import { DeploymentConfig, DeploymentStatus } from './index';

export class EdgeDeployClient {
  private apiUrl: string;
  private apiKey?: string;

  /**
   * Create a new EdgeDeploy client
   * @param apiUrl Base URL for the EdgeDeploy API
   * @param apiKey Optional API key for authentication
   */
  constructor(apiUrl: string, apiKey?: string) {
    this.apiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    this.apiKey = apiKey;
  }

  /**
   * Create request headers including authentication if available
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    return headers;
  }

  /**
   * Handle API response and extract JSON or throw error
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`API Error (${response.status}): ${errorData.error || 'Unknown error'}`);
    }

    return response.json() as Promise<T>;
  }

  /**
   * Get API status
   */
  async getStatus(): Promise<{ name: string; version: string; status: string }> {
    const response = await fetch(`${this.apiUrl}/`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  /**
   * List all projects
   */
  async listProjects(): Promise<DeploymentConfig[]> {
    const response = await fetch(`${this.apiUrl}/api/projects`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  /**
   * Get a project by ID
   */
  async getProject(projectId: string): Promise<DeploymentConfig> {
    const response = await fetch(`${this.apiUrl}/api/projects/${projectId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  /**
   * Create a new project
   */
  async createProject(projectData: Omit<DeploymentConfig, 'id' | 'created' | 'updated'>): Promise<DeploymentConfig> {
    const response = await fetch(`${this.apiUrl}/api/projects`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(projectData),
    });

    return this.handleResponse(response);
  }

  /**
   * Update a project
   */
  async updateProject(projectId: string, updates: Partial<DeploymentConfig>): Promise<DeploymentConfig> {
    const response = await fetch(`${this.apiUrl}/api/projects/${projectId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(updates),
    });

    return this.handleResponse(response);
  }

  /**
   * List all deployments for a project
   */
  async listDeployments(projectId: string): Promise<DeploymentStatus[]> {
    const response = await fetch(`${this.apiUrl}/api/projects/${projectId}/deployments`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  /**
   * Get a deployment by ID
   */
  async getDeployment(deploymentId: string): Promise<DeploymentStatus> {
    const response = await fetch(`${this.apiUrl}/api/deployments/${deploymentId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  /**
   * Trigger a new deployment
   */
  async deploy(projectId: string, options: { 
    branch?: string;
    commit?: { 
      hash: string;
      message: string;
      author: string;
    }
  } = {}): Promise<DeploymentStatus> {
    const response = await fetch(`${this.apiUrl}/api/projects/${projectId}/deploy`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(options),
    });

    return this.handleResponse(response);
  }
} 