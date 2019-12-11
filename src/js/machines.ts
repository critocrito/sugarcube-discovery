import {assign, Machine} from "xstate";

interface PreservationStateSchema {
  states: {
    idle: {};
    select: {};
    loading: {};
    success: {};
    failure: {};
  };
}

interface PreservationContext {
  data?: {};
  error?: {message: string};
}

type PreservationEvent =
  | {type: "PRESERVE"}
  | {type: "SEND"}
  | {type: "CANCEL"}
  | {type: "RETRY"};

export const preservationMachine = Machine<
  PreservationContext,
  PreservationStateSchema,
  PreservationEvent
>({
  id: "preserve",
  initial: "idle",
  context: {
    data: undefined,
    error: undefined,
  },
  states: {
    idle: {
      on: {PRESERVE: "select"},
    },
    select: {
      on: {
        SEND: "loading",
        CANCEL: "idle",
      },
    },
    loading: {
      invoke: {
        src: "fetchData",
        onDone: {
          target: "success",
          actions: assign({
            data: (_, event) => event.data,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: (_, event) => event.data,
          }),
        },
      },
    },
    success: {
      entry: "notifySuccess",
      type: "final",
    },
    failure: {
      on: {
        RETRY: "loading",
        CANCEL: "idle",
      },
    },
  },
});
