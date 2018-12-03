import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Schema, SchemaSummary} from 'app/bpm/shared/services/model'
import {Observable} from 'rxjs'

const SERVICE_BASE = '/web-api/bpm/config'
@Injectable({
  providedIn: 'root'
})
export class SchemaBackendService {



  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<SchemaSummary[]> {
    return this.find('')
  }

  find(filter: string) {
    return this.httpClient.post<SchemaSummary[]>(`${SERVICE_BASE}/schemas`, { filter: filter })
  }

  create(xml: string) {
    return this.httpClient.post<Schema>(`${SERVICE_BASE}/schema`, { xml: xml } )
  }

  update(xml: string) {
    return this.httpClient.put<Schema>(`${SERVICE_BASE}/schema`, { xml: xml } )
  }

  delete(id: string) {
    return this.httpClient.delete(`${SERVICE_BASE}/schema/${id}`)

  }

  findById(id: string) {
    return this.httpClient.get<Schema>(`${SERVICE_BASE}/schema/${id}`)
  }
}
