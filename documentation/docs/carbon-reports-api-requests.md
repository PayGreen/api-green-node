---
id: carbon-reports-api-requests
title: Carbon Reports - Api Requests
---

If you have created and completed carbon footprints, you can now get statistics reports and see all your carbon footprints credit purchases, filtered in many ways.

## carbonReports.get()

-   get carbon reports from last month by default, request a specific period, get daily data details

| Param  | Type                          | Description                                                                               |
| ------ | ----------------------------- | ----------------------------------------------------------------------------------------- |
| params | <code>IReportURLParams</code> | optional, all query params to filter reports requests based on IReportURLParams interface |

-   IReportURLParams: object with specifications of all possible params to apply to filter data :

```
  params = {
      begin?: string | null; // begin date, accepted format YYYY-MM-DD, all entities received will be posterior to this date
      end?: string | null; // end date, accepted format YYYY-MM-DD, all entities received will be anterior to this date
      daily?: 0 | 1 | null ; // numeric literal types are 0 | 1, if 1, day by day data will be provided;
  }
```

-   get all carbon reports, no filter applied. default mode will provide data from the last past 30 days.

```
    return sdk.carbonReports
        .get()
        .then((res) => {
            console.log(res)
        });
```

## API Response

The object inside response contains all informations about carbon footprints associated to a specific user & during the period requested, among which, the total carbon emitted and offset in kilograms and the total purchases price in euros cents.

```
{
    success: true,
    dataInfo: {
        idAccount: 'yourAccountId',
        idUser: 25,
        begin: '2020-06-26',
        end: '2020-07-26',
        ongoingFootprintCount: '17',
        closedFootprintCount: '67',
        purchasedFootprintCount: '120',
        carbonEmitted: '0.5042697442695498',
        carbonOffset: '0.14832419552840292',
        carbonOffsetPrice: '103.82410109043121'
    },
    status: 200
}
```

We have created special tools to handle/convert data inside the response, like Carbon or Price. You can find them [here.](tools.md)
