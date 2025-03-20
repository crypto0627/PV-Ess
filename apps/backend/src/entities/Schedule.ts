import { Schema, model } from 'mongoose'

// eslint-disable-next-line @typescript-eslint/naming-convention
const ScheduleSchema: Schema = new Schema({ // 日前排程API schema
  qseId: String, // 廠商ID
  groupId: Number, // 案場ID
  date: String, // 充電排程日期
  data: {
    timestamp: Date, // 充電排程時間
    status: Number, // ESS狀態 0: normal 1: abnormal
    esHSL: Number, // ESS最大功率
    pvEnergy: Number, // ESS自排程PV發電量
    esEnergy: Number, // ESS自排程ES發電量
    soc: Number, // ESS自排程預計電量
  },
})

export default model('Schedule', ScheduleSchema)
