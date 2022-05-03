<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="theme-color" content="#3B5998" />
    <title>Insert Keywords — {{ config('app.name', 'Laravel') }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #efefef;
        }

        table {
            width: 100%;
        }

        table tr td {
            line-height: 30px;
            background: #4777e0;
            width: 100%;
            padding: 10px;
            color: #fff;
            cursor: pointer;
            font-weight: 500;
            transition: 200ms all linear;
        }

        table tr td:hover {
            background: #2a4e9c;
        }

    </style>
    <script>
        function keywordSelected(val) {
            opener.putTagVal(val);
        }
    </script>
</head>

<body>

    <table>
        <tbody>
            <tr>
                <td onclick="keywordSelected(' @{{$customerBranch.complete_name}}')">Name</td>
            </tr>
            <tr>
                <td onclick="keywordSelected(' @{{$customerBranch.new_address}}')">Address</td>
            </tr>
            <tr>
                <td onclick="keywordSelected(' @{{$customerBranch.delivery_schedule_name}}')">Delivery Days</td>
            </tr>
            <tr>
                <td onclick="keywordSelected(' @{{$customerBranch.customer.membership_no}}')">Membership ID</td>
            </tr>
            <tr>
                <td onclick="keywordSelected(' @{{$customerBranch.block.name}}')">Block</td>
            </tr>
            <tr>
                <td onclick="keywordSelected(' @{{$customerBranch.town.name}}')">Town</td>
            </tr>
        </tbody>
    </table>

</body>

</html>
