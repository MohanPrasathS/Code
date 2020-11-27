import 'package:http/http.dart' as http;
import 'dart:convert';
insert(rollNo, date, time, status) async {
  var url = 'https://scanner-in.herokuapp.com/insert';
  final http.Response res = await http.post(
      url,
      headers: <String, String>{
        "Content-Type": "application/json; charset=UTF-8",
      },
      body:jsonEncode({
        "rollNo": rollNo,
        "date": date,
        "time": time,
        "status": status,
      }));

  print(res.body);

}