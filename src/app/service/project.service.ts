import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Project } from '../domain';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectService {
    private readonly domain = 'projects';
    private headers = new Headers({
        'Conntent-Type': 'application/json'
    });
    constructor(private http: Http, @Inject('BASE_CONFIG') private config) { }

    // POST
    add(project: Project): Observable<Project> {
        project.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http
            .post(uri, JSON.stringify(project), { headers: this.headers })
            .map(res => res.json());
    }
    // PUT 更新整个project   patch只更新你需要更改的项
    update(project: Project): Observable<Project> {
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        const toUpdate = {
            name: project.name,
            desc: project.desc,
            coverImg: project.coverImg
        };
        return this.http
            .patch(uri, JSON.stringify(toUpdate), { headers: this.headers })
            .map(res => res.json());
    }
    // DELETE
    del(project: Project): Observable<any> {
        const delTask$ = Observable.from(project.taskLists)
            .mergeMap(listId => this.http.post(`${this.config.uri}/taskLists/${listId}`, {}))
            .count();
        return delTask$
            .switchMap(_ => this.http.post(`${this.config.uri}/${this.domain}/${project.id}`, {}))
            .mapTo(project);
    }
    // GET
    get(userId: string): Observable<Project[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        if (userId === '0' || userId === '1') {
            return this.http
                .get(uri)
                .map(res => res.json() as Project[]);
        } else {
            // params:{}  这样传递url参数可以进行encoding 而不是 `${this.config.uri}/${this.domain}?members_like=${urseId}`;
            return this.http
                .get(uri, { params: { 'member': userId } })
                .map(res => res.json() as Project[]);
        }
    }
}
