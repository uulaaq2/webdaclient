import { createMachine, interpret, assign } from 'xstate'
import { setError, setSuccess, setWarning } from 'functions/setReply'

export const apiMachine = createMachine({
  id: 'apiMachine',
  preserveActionOrder: true,
  initial: 'waiting',
  context: {    
    data: {},
    params: {},
    inProgress: false
  },

  states: {

    waiting: {
      on: {
        START: {
          target: 'starting'
        }
      }
    },

    starting: {
      entry: assign({ inProgress: true}),      
      invoke: {
        id: 'started',
        src: start,
        onDone:[
          {
            target: 'finished',
            cond: (c, e) => e.data.status === 'ok'
          },
          {
            target: 'failed'
          }
        ]
      },
      exit: assign({ data: (c, e) => e.data })
    },

    failed: {
      entry: assign({ inProgress: false}),
      on: {
        RESET: {
          target: 'waiting'
        }
      }
    },

    finished: {
      entry: assign({ inProgress: false}),
      on: {
        RESET: {
          target: 'waiting'
        }
      }
    }

  }
  
})

async function start(c, e) {   
  const result = await e.startFunction(c.params)

  return result
}