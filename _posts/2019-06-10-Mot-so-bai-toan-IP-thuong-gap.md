---
layout: post
title:  "Một số bài toán IP thường gặp"
subtitle: "Một số bài toán IP thường gặp"
categories: [IT]
tags: [Networking,Vietnamese]
permalink: /common-IP-mathematical-problems/
---

![](/images/2019-06-10-Mot-so-bai-toan-IP-thuong-gap-1.png)

## 1. Địa chỉ IP

Địa chỉ IP có thể được biểu diễn dưới dạng mã nhị phân 32 bit bao gồm bốn nhóm 8 bit như hình trên (hoặc bình thường thì được biểu diễn dưới 
dạng thập phân: cứ 8 bit được quy đổi ra một số thập phân, các số thập phân cách nhau bởi dấu chấm). 32 bit này được chia thành hai phần (từ trái qua phải): 

- **X** bit đầu tương ứng với **Net Address** (địa chỉ mạng).
- **32 - X** bit tiếp theo tương ứng với **Host Address** (địa chỉ máy chủ). 

Ngoài ra, ngay sau dãy số thập phân đó còn có thể có thêm một dấu gạch xiên **/** và một số thập phân nữa có giá trị bé hơn 32, con số 
này được gọi là **subnet mask** (hay còn gọi là **mask/netmask**).

**_Ví dụ_**: _192.168.1.5/28_

Địa chỉ IP có thể được chia làm 3 chính như sau:

- **Nhóm A**: các địa chỉ IP từ _1.x.y.z_ đến _126.x.y.z_ (**subnet mask** mặc định là 8)
- **Nhóm B**: các địa chỉ IP từ _128.x.y.z_ đến _191.x.y.z_ (**subnet mask** mặc định là 16)
- **Nhóm C**: các địa chỉ IP từ _192.x.y.z_ đến _223.x.y.z_ (**subnet mask** mặc định là 24)

**_Lưu ý_**: Nhóm D và E dùng trong nghiên cứu, không sử dụng trong mạng thông thường nên mình tạm không nói tới. Ngoài ra những địa chỉ IP trong phạm 
vi _127.x.y.z_ là local host nên cũng không dùng tới.

**_Cách nhận diện nhanh_**:

- Các địa chỉ IP của nhóm A có bit đầu tiên (từ trái qua) là 0.
- Các địa chỉ IP của nhóm B có 2 bit đầu tiên (từ trái qua) là 10.
- Các địa chỉ IP của nhóm C có 3 bit đầu tiên (từ trái qua) là 110.

## 2. Cách xác định Net Address & Host Address của một địa chỉ IP có dạng _x.y.z.t/m_

> * **Bước 1**: ta lấy 32 - m = số bit biểu diễn phần **Host Address** trong dãy 32 bit của địa chỉ IP. Nếu đổi m bit này ra hệ thập phân thì sẽ được phần host.
> * **Bước 2**: lấy m bit đầu từ địa chỉ IP, rồi thêm 32 - m bit 0 theo sau, ta sẽ được một dãy 32 bit biểu diễn **Net Address**.

**_Ví dụ_**: xét địa chỉ _192.168.1.5/28_
  - Biểu diễn nhị phân của _192.168.1.5_ là _11000000 10101000 00000001 00000101_.
  - Ta có 32 - 28 = 4, nên trong địa chỉ IP này có 4 bit cuối biểu diễn **Host Address** là 0101 với giá trị thập phân tương ứng là 5 
=> **Host Address** của địa chỉ IP này là 5.
  - Lấy 28 bit đầu từ địa chỉ IP cộng thêm 4 bit 0 theo sau (in đậm) ta được dãy _11000000 10101000 00000001 0000**0000**_.
Đổi ra thập phân thành: _192.168.1.0_ => **Net Address** của địa chỉ IP này là _192.168.1.0_.

## 3. Liệt kê các dãy IP của mạng

Đề bài có thể cho 1 địa chỉ IP có dạng _x.y.z.t/m_ và bảo mình xác định dãy địa chỉ IP cùng mạng với địa chỉ IP đó, hoặc có thể đề hỏi là
có bao nhiêu địa chỉ IP thuộc mạng của địa chỉ IP này (hoặc là cùng mạng với địa chỉ IP này). Vì hai dạng bài này có chung một hướng giải
quyết nên mình gom vào thành 1 mục.

Đối với các IP cùng mạng, thứ để phân biệt chúng chính là **Host Address**, cho nên việc quan trọng cần làm chính là tính ra số **Host 
Address** của mạng.
> * **Bước 1**: như bước 1 ở mục 2, ta có thể xác định số bit biểu diễn **Host Address** bằng cách lấy 32 – m => 
số lượng **Host Address** của mạng này là $2^{(32 - m)} - 2$, giá trị 2 bị trừ đi bao gồm **Host Address** nhỏ nhất (địa chỉ mạng) và **Host Address** lớn nhất (địa chỉ broadcast).
> * **Bước 2**: để xác định các địa chỉ IP thuộc mạng này, ta cũng giữ nguyên m bit từ địa chỉ IP gốc rồi thêm vào m bit phía sau từ các chỉnh hợp m bit được tạo ra  trừ 2 chỉnh hợp có giá trị nhỏ nhất và lớn nhất
(Ví dụ: với m =2 thì các tổ hợp là 00, 01, 10, 11. Ta loại bỏ hai tổ hợp lớn & nhỏ nhất là 00 và 11).

**_Ví dụ_**: xét địa chỉ _192.168.1.5/28_
- Có tất cả là $2^{(32 - 28)} - 2 = 14$ chỉnh hợp cho 4 bit **Host Address**.
- Giữ nguyên 28 bit đầu: _11000000 10101000 00000001 0000_
  + Thêm 0001 sau cùng (in đậm): _11000000 10101000 00000001 0000**0001**_ ta được địa chỉ IP _192.168.1.1_.
  + Thêm 0010 sau cùng (in đậm): _11000000 10101000 00000001 0000**0010**_ ta được địa chỉ IP _192.168.1.2_.
  + … (cứ tiếp tục như vậy cho đủ 14 **Host Address**).
  
## 4. Chia subnet

Các bạn đã thấy trong phần định nghĩa các nhóm IP mình đã nói tới **subnet mask** mặc định. Ứng dụng của nó sẽ được dùng tới trong phần này.

Đề bài cho 1 địa chỉ mạng kèm theo **subnet mask** mặc định (tạm đặt là m) của địa chỉ IP đó và yêu cầu chúng ta tính (hoặc liệt kê, hoặc cả hai) số **subnet** (mạng con) X chia được từ địa chỉ mạng đó 
(X > m).

Cốt lõi của dạng toán này là từ địa chỉ mạng ban đầu, chúng ta "vay mượn" thêm một số bit nữa từ **Host Address** để tạo ra các địa chỉ 
mạng mới.

> * **Bước 1**: tính số bit được mượn từ **Host Address** = X - m.
> * **Bước 2**: giống như mục 3, ta xác định số **subnet** chia được = $2^{(số bit mượn)}$.
> * **Bước 3**: giữ nguyên m bit đầu từ địa chỉ mạng gốc, thêm vào X - m bit được mượn (X - m bit này cũng tạo thành các chỉnh hợp khác nhau,
nhưng lần này không cần bỏ bớt 2 chỉnh hợp) và 32 - X bit cuối lấy từ 32 - X bit cuối của địa chỉ mạng gốc.

**_Ví dụ_**: cho địa chỉ _192.168.1.0/24_ chia được bao nhiêu subnet 28, liệt kê.

- Ta chia được $2^{(28 - 24)} = 16$ **subnet** 28.
- Giữ nguyên 24 bit đầu và $32 - 28 = 4$ bit cuối của địa chỉ mạng gốc: _11000000 10101000 00000001 (…)0000_.
Điền từng chỉnh hợp $28 - 24 = 4$ bit vào chỗ trống, ta được các địa chỉ mạng cần tìm:

  + _11000000 10101000 00000001 00000000_ -> _192.168.1.0/28_
  + _11000000 10101000 00000001 00010000_ -> _192.168.1.16/28_
  + _11000000 10101000 00000001 00100000_ -> _192.168.1.32/28_
  + … (cứ tiếp tục như vậy cho đủ 16 **subnet**).
  
## 5.Tính subnet để cấp cho mạng con số host yêu cầu
Dạng này thì ngược lại so với mục 4, đề cũng cho địa chỉ mạng gốc kèm **subnet mask** (không nhất thiết là mặc định, tạm gọi là m) và 
yêu cầu tìm số **subnet mask** mới để cấp cho mạng con x host.
> * **Bước 1**: dùng công thức tính số bit cần mượn từ **Host Address** của địa chỉ mạng gốc (tạm gọi là n): $n = \log_2 (x + 2)$ (lấy giá trị nguyên làm tròn lên).
> * **Bước 2**: giống như mục 4, giữ nguyên m bit đầu và $32 - (m + n)$ bit cuối của địa chỉ mạng gốc, và chèn vào n bit giữa là các chỉnh hợp n bit.

**_Ví dụ_**: cho địa chỉ _192.168.1.0/24_, tính **subnet** để cho mạng con có 50 host.
- $n = \log_2 (50 + 2) ≈ 6$ => mượn 6 bit từ **Host Address** địa chỉ mạng gốc => số **subnet mask** mới là $24 + 6 = 30$.
- Giữ nguyên 24 bit đầu và $32 - (24 + 6) = 2$ bit cuối: _11000000 10101000 00000001 (……)00_.
- Điền vào chỗ trống các tổ hợp 6 bit như sau:

  + _11000000 10101000 00000001 00000000_ -> _192.168.1.0/30_
  + _11000000 10101000 00000001 00000100_ -> _192.168.1.4/30_
  + _11000000 10101000 00000001 00001000_ -> _192.168.1.8/30_
  + … (cứ tiếp tục như vậy cho đủ 30 **subnet mask**).
