import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

/**
 * Service to store user and token info in local storage.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * Function to save token
   * @param token
   */
  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  /**
   * Function to save user info.
   * @param user
   */
  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  /**
   * Function to get token
   * @return token
   */
  static getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  /**
   * Function to get user details
   * @return user
   */
    static getUser(): any {
      return JSON.parse(localStorage.getItem(USER) || " ");
    }

  /**
   * Function to get user role
   * @return user role
   */
    static getUserRole(): string {
      const user = this.getUser();
      if (user == null) {
        return '';
      }
      return user.role;
    }

  /**
   * Function to verify if admin logged in or not
   * @return true or false
   */
    static isAdminLoggedIn(): boolean {
      if (this.getToken() == null) {
        return false;
      }
      const role = this.getUserRole();
      return role == "ADMIN";
    }

  /**
   * Function to verify if contributor logged in or not
   * @return true or false
   */
    static isContributorLoggedIn(): boolean {
      if (this.getToken() == null) {
        return false;
      }
      const role = this.getUserRole();
      return role == "CONTRIBUTOR";
    }

  /**
   * Function to get user id
   * @return user id
   */
    static getUserId(): string {
      const user = this.getUser();
      if (user == null) {
        return "";
      }
      return user.id;
    }

  /**
   * Function to logout a user
   */
    static logout(): void {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }
