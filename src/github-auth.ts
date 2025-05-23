import { Octokit } from '@octokit/rest';
import { AuthenticationError } from './common/errors.js';

// GitHub API client
let octokit: Octokit;

/**
 * Initialize Octokit with token from environment
 * @returns Initialized Octokit instance
 */
export function initializeOctokit(): Octokit {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new AuthenticationError('GitHub token not found. Please set the GITHUB_TOKEN environment variable.');
  }
  
  octokit = new Octokit({ auth: token });
  return octokit;
}

/**
 * Get the current Octokit instance or initialize if not exists
 * @returns Octokit instance
 */
export function getOctokit(): Octokit {
  if (!octokit) {
    return initializeOctokit();
  }
  return octokit;
}