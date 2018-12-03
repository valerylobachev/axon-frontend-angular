import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {SchemaBackendService} from '@app/bpm/shared/services/schema-backend.service'
import {Schema} from '@app/bpm/shared/services/model'
import {CreateSchema, DeleteSchema, UpdateSchema} from '@app/bpm/shared/services/schema.actions'
import {Store} from '@ngrx/store'
import {BpmnEditComponent} from '@app/bpm/config/schema/bpmn-view/bpmn-edit.component'

const NEW_SCHEMA: Schema = {
  id: '',
  name: '',
  description: '',
  notation: 'BPMN',
  schema: '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
      'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
      'xmlns:di="http://www.omg.org/spec/DD/20100524/DI" ' +
      'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
      'id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" ' +
      'exporter="Camunda Modeler" exporterVersion="1.11.3">\n' +
      '  <bpmn:process id="process" isExecutable="true">\n' +
      '    <bpmn:startEvent id="StartEvent_1" />\n' +
      '  </bpmn:process>\n' +
      '  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\n' +
      '    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="process">\n' +
      '      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\n' +
      '        <dc:Bounds x="173" y="102" width="36" height="36" />\n' +
      '      </bpmndi:BPMNShape>\n' +
      '    </bpmndi:BPMNPlane>\n' +
      '  </bpmndi:BPMNDiagram>\n' +
      '</bpmn:definitions>`'
};

@Component({
  selector: 'axon-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.scss']
})
export class SchemaComponent implements OnInit {

  @ViewChild('bpmnEdit') bpmnEdit: BpmnEditComponent;

  action = '';
  id = '';
  schema: Schema = {
    id: '',
    name: '',
    description: '',
    notation: 'BPMN',
    schema: null
  };
  showSchema = false;



  constructor(
      private schemaBackend: SchemaBackendService,
      private activatedRoute: ActivatedRoute,
      private store: Store<any>
  ) {
    this.activatedRoute.params.subscribe(params => {
      //console.log(params)
      this.update(params['action'], params['id'])
    });
  }

  ngOnInit() {
  }

  save() {
    const newSchema: Schema = {
      id: this.bpmnEdit.bpmnModel.getProcessId(),
      name: this.bpmnEdit.bpmnModel.getName(),
      description: this.bpmnEdit.bpmnModel.getDescription(),
      notation: this.schema.notation,
      schema: ''
    };

    const done = function (err, xml) {
      if (err) {
        console.log(err);
      } else {
        if (this.action === 'create') {
          this.store.dispatch(new CreateSchema({schema: xml}));
        } else if (this.action === 'update') {
          newSchema.schema = xml;
          this.store.dispatch(new UpdateSchema({
            update:
                {
                  id: this.id,
                  changes: newSchema
                }
          }));
        }
      }
    };


    this.bpmnEdit.bpmnModel.saveXML(done.bind(this));
  }

  update(action: string, id: string) {
    this.action = action
    this.id = id
    if (id !== "new") {
      this.showSchema = false
      //console.log('loading schema...')
      this.schemaBackend.findById(id)
          .subscribe(
              schema => {
                //console.log(schema)
                this.schema = schema
                this.showSchema = true
              },
              failure =>
                  console.log(failure)
          );
    } else {
      this.schema = NEW_SCHEMA;
      this.showSchema = true;
    }
  }

}
