export type DataToken = {
    sub: string;
    uuid: string;
    username: string;
    verified: boolean;
    type: any;
    deleted: boolean;
    iat: number;
    // ! Expirate days sould be dinamic! Will used for recovery option too.
    exp: number;
  };
  
  export type TokenUserType = Partial<DataToken>;
  