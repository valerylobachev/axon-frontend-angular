import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import {BpmnModelerModel} from './bpmn-modeler'

@Component({
  selector: 'axon-bpmn-edit',
  templateUrl: './bpmn-edit.component.html',
  styleUrls: ['./bpmn-edit.component.css']
})
export class BpmnEditComponent implements OnInit, OnChanges {
  bpmnModel: BpmnModelerModel

  @Input() schema: string;

  ngOnInit() {
  }

  ngOnChanges(changes) {

    if (changes.schema && changes.schema.currentValue ) {
      //console.log('ngOnChanges')
      //console.log(`[${changes.schema.currentValue}]`)
      if (this.bpmnModel === void 0) {
        const selector = document.querySelector('.canvas');
        this.bpmnModel = new BpmnModelerModel({
          container: '.canvas',
          width: '100%',
          height: '100%',
          keyboard: {
            bindTo: selector
          },
          propertiesPanel: {
            parent: '.properties'
          }
        });

        this.bpmnModel.importXML(changes.schema.currentValue);

      }
    }
  }
}
