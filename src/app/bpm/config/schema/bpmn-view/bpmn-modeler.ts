import Modeler from 'bpmn-js/lib/Modeler';
import * as CamundaExtensionModule from 'camunda-bpmn-moddle/lib';
import * as CamundaModdle from 'camunda-bpmn-moddle/resources/camunda.json';
import * as PropertiesPanelModule from 'bpmn-js-properties-panel';
import * as PropertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';

export class BpmnModelerModel {
  xml: string = '';
  modeler: any;
  constructor(opts: any) {
    const extendedOpts = {
      additionalModules: [CamundaExtensionModule, PropertiesPanelModule, PropertiesProviderModule],
      moddleExtensions: {
        camunda: CamundaModdle
      },
      ...opts
    };
    this.modeler = new Modeler(extendedOpts);
  }
  importXML(xml): void {
    this.modeler.importXML(xml, err => {
      console.log('defs', this.modeler);
      if (err) {
        console.error('BPMN import error');
      } else {
        console.log('bpmn import ok');
      }
    });
  }

  saveXML(done): void {
    return this.modeler.saveXML(done);
  }
  getProcessId(): string {
    return this.modeler._definitions.rootElements[0].id;
  }

  getName(): string {
    if (this.modeler._definitions && this.modeler._definitions.rootElements[0] && this.modeler._definitions.rootElements[0].name) {
      return this.modeler._definitions.rootElements[0].name || '';
    } else {
      return ''
    }
  }

  getDescription(): string {
    if (this.modeler._definitions && this.modeler._definitions.rootElements[0] &&
        this.modeler._definitions.rootElements[0].documentation[0] && this.modeler._definitions.rootElements[0].documentation[0].text) {
      return this.modeler._definitions.rootElements[0].documentation[0].text || '';
    } else {
      return ''
    }
  }
}
