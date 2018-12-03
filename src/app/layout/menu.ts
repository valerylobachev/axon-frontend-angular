import {Menu} from '@app/layout/menu/menu.model'


export const MENUITEMS: Menu[] = [

  {state: '/bpm/tasks', name: 'axon.menu.tasks', type: 'link', fontSet: 'fas', icon: 'fa-tasks' },
  {state: '/bpm/processes', name: 'axon.menu.processes', type: 'link', fontSet: 'fas', icon: 'fa-list' },
  {state: '/org-structure', name: 'axon.menu.org-structure', type: 'link', fontSet: 'fas', icon: 'fa-building'  },
  {state: '/projects', name: 'axon.menu.projects', type: 'link', fontSet: 'fas', icon: 'fa-project-diagram'},
  {
    name: 'axon.menu.config',
    type: 'sub',
    fontSet: 'fas', icon: 'fa-cogs',
    children: [
      {
        state: '/bpm-config/', name: 'axon.menu.config.bpm', type: 'sub' , fontSet: 'fas', icon: 'fa-tasks',
        children: [
          {state: '/bpm-config/schemas', name: 'axon.menu.config.bpm.schemas', type: 'link', fontSet: 'fas', icon: 'fa-project-diagram'},
          {state: '/bpm-config/', name: 'axon.menu.config.bpm.processes', type: 'link', fontSet: 'fas', icon: 'fa-tasks'},
        ]
      },
      {state: '/config/', name: 'axon.menu.config.org-structure', type: 'link' , fontSet: 'fas', icon: 'fa-building'},
      {state: '/config/', name: 'axon.menu.config.forms', type: 'link', fontSet: 'fas', icon: 'fa-id-card'},
      {state: '/config/', name: 'axon.menu.config.knowledge', type: 'link' , fontSet: 'fas', icon: 'fa-database'},
      {state: '/config/', name: 'axon.menu.config.projects', type: 'link' , fontSet: 'fas', icon: 'fa-project-diagram'},
    ]
  },
  {state: '/admin', name: 'axon.menu.admin', type: 'link', fontSet: 'fas', icon: 'fa-university' }

];

