---
id: carbon-reports-api-requests
title: Carbon Reports - Api Requests
---

If you have created and completed carbon footprints, you can now get statistics reports and see all your carbon footprints credit purchases, filtered in many ways.

## carbonReports.get()

-   get carbon reports from last month by default or on a specific requested period

| Param      | Type                | Description                                                                                                  |
| ---------- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| beginDate? | <code>string</code> | optional, if no date specified, date one month ago from current day will be used, accepted format YYYY-MM-DD |
| endDate?   | <code>string</code> | optional, if no date specified, current day will be used, accepted format YYYY-MM-DD                         |

```
    return sdk.carbonReports
        .get(beginDate?, endDate?)
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
