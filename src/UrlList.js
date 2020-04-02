// LISTE URL

// authentication
`${this.host}/login`
`${this.host}/login`

paths = {
   path1 : "/login",
}

// carbon
`${this.host}/tree/ccarbon`
`${this.host}/tree/ccarbon`
`${this.host}/tree/ccarbon/${fingerPrint}` //required
`${this.host}/tree/ccarbon/${fingerPrint}` //required
`${this.host}/tree/ccarbon/${fingerPrint}` //required

paths = {
   path1 : "/tree/ccarbon"
}

// carbonstatistics
`${this.host}/tree/ccarbon-statistics`
`${this.host}/tree/ccarbon-statistics?date=${date}`//required
`${this.host}/tree/ccarbon-statistics?start=${start}&end=${endDate}`// required with default value for endDate

paths = {
   path1 : "/tree/ccarbon-statistics",
   path2 : "/tree/ccarbon-statistics?date=",
   path3 : "/tree/ccarbon-statistics?start=",
   pathRab :"&end=", 
   id2Default: "new Date"
}

// Iban
`${this.host}/account/me/user/${userName}/rib` // required with default value for userName
`${this.host}/account/me/user/${userName}/rib` // required with default value for userName
`${this.host}/account/me/user/${userName}/rib/${ibanId}` // required with default value for userName
`${this.host}/account/me/user/${userName}/rib/${ibanId}` // required with default value for userName
`${this.host}/account/me/user/${userName}/rib/${ibanId}` // required with default value for userName
`${this.host}/account/me/user/${userName}/rib/${ibanId}` // required with default value for userName

 paths = {
   path1 : "/account/me/user/",
   pathRab :"/rib",
   idDefault: "me",
   build = (id) => {
      path1 + id + pathRab
   }
}

// Transport
`${this.host}/tree/ccarbon-transport`

paths = {
   path1:"/tree/ccarbon-transport",
}

// User
`${this.host}/account/me`
`${this.host}/account/me/user`
`${this.host}/account/me/user/${userName}` // required with default value
`${this.host}/account/me/user`
`${this.host}/account/me/user/${userName}` // required with default value
`${this.host}/account/me/user/${userName}` // required

paths = {
   path1:"/account/me",
   path2:'/account/me/user',
}