@Injectable({
    providedIn: 'root'
  })
  export class TaskService {
  
    constructor(private http: HttpClient) {
    }
  
    save(task) {
      return this.http.post(environment.apiUrl + 'api/entity/task', task);
    }
  
    get(user) {
      return this.http.get(environment.apiUrl + 'api/entity/task/' + user);
    }
  
    delete(task) {
      return this.http.post(environment.apiUrl + 'api/entity/delete/task', task);
    }
  
    update(task) {
      return this.http.put(environment.apiUrl + 'api/entity/task', task);
    }
  }