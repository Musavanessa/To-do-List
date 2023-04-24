@Injectable({
    providedIn: 'root'
  })
  export class UserService {
  
    constructor(private http: HttpClient) {
    }
  
    login(user: User) {
      return this.http.post(environment.apiUrl + 'api/users/login', user);
    }
  
    register(user: User) {
      return this.http.post<{ message: string }>(environment.apiUrl + 'api/users/register', user);
    }
  }