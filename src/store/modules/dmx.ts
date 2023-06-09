import { getValues } from '@/api/dmx'
import type { Context, Store } from '@/store/types'

export type ChannelPayload = {
  name: string,
  channel: number,
  value: number,
}

export type BulkChannelPayload = number[]

export interface DMXState {
  channel: number[]
}

export default {
  state: {
    channel: new Array(513).fill(0),
  },

  mutations: {
    channel(state: DMXState, payload: ChannelPayload) {
      state.channel[payload.channel] = payload.value
    },

    channels(state: DMXState, values: BulkChannelPayload) {
      state.channel.length = 0
      state.channel.push(0, ...values)
    },
  },

  actions: {
    updateChannel(this: Store, ctx: Context, payload: ChannelPayload) {
      this.socket.emitSocket('update', payload)

      this.commit('channel', payload)
    },

    async getAllChannelValues(this: Store, ctx: Context, name: string) {
      const values = await getValues(name)

      this.commit('channels', values)
    },

    resetAllChannelValues(this: Store) {
      this.commit('channels', new Array(512).fill(0))
    },
  },
}


