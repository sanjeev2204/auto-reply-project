export interface ISettingInputDTO {    
    // _id: string; 
      botId: string;
      isCalledReply: Boolean;
      isSmsReply: Boolean;
      isMmsReply: Boolean;
      delayResponse: Number;
      inActiveTimes: Number;
      disconnectTimes: Number;
      reativeUser: Number;
      mobile: Number,
      defaultText: string,
    }