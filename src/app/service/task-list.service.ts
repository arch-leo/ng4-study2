import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TaskList } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TaskListService {
    private readonly domain = 'taskLists';
    private headers = new Headers({
        'Conntent-Type': 'application/json'
    });
    constructor(private http: Http, @Inject('BASE_CONFIG') private config) { }

    // POST
    add(taskList: TaskList): Observable<TaskList> {
        taskList.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post(uri, JSON.stringify(taskList), { headers: this.headers })
            .map(res => res.json());
    }
    // DELETE
    get(projectId: string): Observable<TaskList[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        // params:{}  这样传递url参数可以进行encoding 而不是 `${this.config.uri}/${this.domain}?members_like=${urseId}`;
        return this.http
            .get(uri, { params: { 'projectId': projectId } })
            .map(res => res.json() as TaskList[]);
    }
    // drag drop
    swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
        const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
        const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
        const drag$ = this.http
            .patch(dragUri, JSON.stringify({ order: target.order }), { headers: this.headers })
            .map(res => res.json());
        const drop$ = this.http
            .patch(dropUri, JSON.stringify({ order: src.order }), { headers: this.headers })
            .map(res => res.json());
        return Observable
            .concat(drag$, drop$)
            .reduce((arrs, list) => [...arrs, list], []);
    }
}
