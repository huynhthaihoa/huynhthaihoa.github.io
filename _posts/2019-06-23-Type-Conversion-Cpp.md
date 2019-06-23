---
title: "Type conversion: chuyển (ép) kiểu trong C++"
subtitle: "Những điều cần biết về chuyển (ép) kiểu trong ngôn ngữ C++"
date:   2019-06-23
categories: [Programming]
tags: [C++]
permalink: /type-conversion-cpp/
---
*(Bài viết được dịch từ: [cplusplus.com](http://www.cplusplus.com/doc/tutorial/typecasting/))*
### 1. CHUYỂN KIỂU NGẦM ĐỊNH (IMPLICIT CONVERSIONS)
Việc chuyển kiểu ngầm định được thực hiện tự động khi một giá trị được sao chép vào một kiểu dữ liệu tương thích, ví dụ như sau:
```C++
   short a = 2000;
   int b;
   b = a;
```
Ở đây, giá trị của biến a được "thăng cấp" từ kiểu *short* thành kiểu *int* mà không cần phải sử dụng bất kì toán tử tường minh nào. Điều 
này còn được gọi là **chuyển kiểu chuẩn (standard conversion)**. Chuyển kiểu chuẩn ảnh hưởng tới các kiểu dữ liệu cơ bản, cho phép chuyển kiểu 
giữa các kiểu dữ liệu số (_short_ thành _int_, _int_ thành _float_, _double_ thành _int_...), chuyển qua lại với kiểu dữ liệu *bool* và một 
vài chuyển kiểu con trỏ.

Việc chuyển đổi từ những kiểu dữ liệu numeric (dạng số) có số byte cấp phát nhỏ hơn thành kiểu _int_ , hoặc từ _float_ thành _double_ đảm 
bảo rằng giá trị đích là một giá trị chính xác với giá trị gốc. Những phép chuyển đổi khác giữa các kiểu dữ liệu numeric có thể không phải 
lúc nào cũng sẽ thể hiện được chính xác giá trị:
* Nếu một số nguyên âm được chuyển đổi sang một kiểu dữ liệu unsigned (không dấu), giá trị kết quả sẽ tương ứng với phép bù 2 bit (ví dụ: 
-1 sẽ trở thành giá trị lớn nhất thuộc kiểu dữ liệu đó, -2 là giá trị lớn thứ nhì...)
* Việc chuyển đổi từ/đến kiểu _bool_ sẽ cân nhắc rằng false tương đương với zero (0, kiểu numeric) và kiểu con trỏ null (cho kiểu con trỏ); 
true tương đương với tất cả các giá trị khác và sẽ được chuyển đổi thành một giá trị tương đương với 1.
* Nếu việc chuyển kiểu là từ một kiểu dữ liệu số thực sang kiểu số nguyên, giá trị sẽ được "làm tròn" (loại bỏ phần thập phân). Nếu kết quả
nằm ngoài phạm vi giá trị của kiểu thì việc chuyển kiểu này sẽ gây ra **hành vi không được định nghĩa (undefined behavior)**.
* Mặt khác, nếu việc chuyển kiểu xảy ra giữa kiểu số của cùng một "loại" (số nguyên -> số nguyên, số thực -> số thực) thì việc chuyển kiểu 
sẽ hợp lệ, tuy nhiên giá trị sẽ trở thành **implementation-specific** (phụ thuộc vào việc hiện thực - implement), làm mất đi tính portable.

Sẽ có một số trường hợp chuyển kiểu có ngụ ý sẽ mất đi sự chính xác, được thể hiện bằng cảnh báo của trình biên dịch. Cảnh báo này có thể
được tránh bằng cách sử dụng phép chuyển kiểu tường minh.
Đối với các kiểu dữ liệu không phải là kiểu dữ liệu cơ sở, các mảng và hàm sẽ được chuyển ngầm định thành con trỏ, và con trỏ về tổng 
quan sẽ cho phép những phép chuyển đổi sau:
* Con trỏ null có thể được chuyển thành con trỏ của bất kì kiểu dữ liệu nào.
* Con trỏ của bất kì kiểu dữ liệu nào có thể được chuyển thành con trỏ kiểu _void_.
* Con trỏ upcast (con trỏ tới lớp dẫn xuất) có thể được chuyển thành con trỏ của lớp cơ sở (với điều kiện lớp cơ sở đó phải 
**tiếp cận được (accessible)** và **rõ ràng (unambigious)** mà không làm thay đổi tiêu chuẩn **hằng" (const)** hoặc **hay thay đổi
(volatile)** của nó.
### 2. CHUYỂN KIỂU NGẦM ĐỊNH VỚI CLASS
Đối với các class, việc chuyển kiểu ngầm định có thể được kiểm soát bằng cách sử dụng 3 phương thức sau:
* **Single-argument constructor (phương thức thiết lập sao chép)**: cho phép chuyển kiểu ngầm định từ kiểu riệng biệt để khởi tạo đối 
tượng.
* **Assignment operator (toán tử gán)**: cho phép chuyển kiểu ngầm định từ kiểu riêng biệt khi thực hiện gán.
* **Type-cast operator (toán tử "ném" kiểu)**: cho phép chuyển ngầm định đến một kiểu dữ liệu riêng biệt.

Ví dụ:
```C++
  //implicit conversion of classes:
   #include <iostream>
   using namespace std;
  
  class A{};

  class B {
      //conversion from A (constructor)
      B (const A& x) {}
      //conversion from A (assignment)
      B & operator = (const A& x) {return *this;}
      //conversion to A (type-cast operator)
       operator A() {return A();}
   };

   int main()
   {
      A foo;
      B bar = foo;      //calls constructor
      bar = foo;         //call assignment
      foo = bar;         //call type-cast operator
      return 0;
   }
```
Toán tử type-cast sử dụng cú pháp riêng biệt: khi sử dụng từ khóa _operator_ đi theo sau là kiểu dữ liệu đích và một cặp dấu ngoặc đơn 
rỗng. Lưu ý rằng kiểu trả về là kiểu dữ liệu đích và không được phép đặc tả trước từ khóa _operator_.
### 3. TỪ KHÓA TƯỜNG MINH (KEYWORD EXPLICIT)
Với lời gọi hàm, C++ cho phép chuyển kiểu tường minh được thực hiện cho mỗi đối số. Điều này có thể gây ra một chút mơ hồ cho các class bởi vì nó không phải lúc nào cũng thực hiện đúng như mong đợi. Để cho dễ hiểu hơn chúng ta cùng xem ví dụ sau:
```C++
   void fn (B arg) {}
```
Hàm này nhận đối số là một đối tượng thuộc class **_B_**, nhưng nó cũng có thể được gọi với đối số là đối tượng thuộc class **_A_**:
```C++
   fn (foo);
```  
Nó có thể thực hiện đúng hoặc không đúng theo những gì lập trình viên mong đợi, tuy nhiên dù trong trường hợp nào thì cũng có thể phòng ngừa bằng cách đánh dấu cho constructor ảnh hưởng với từ khóa _explicit_, như trong ví dụ dưới đây:
```C++
   //explicit
   #include <iostream>
   using namespace std;

   class A {};

   class B {
   public:
      explicit B (const A& x) {}
      B& operator = (const A& x) {return *this;}
      operator A() {return A();}
   };

   void fn (B x) {}

   int main ()
   {
      A foo;
      B bar (foo);
      bar = foo;
      foo = bar;
      // fn (foo);   // not allowed for explicit ctor
      fn (bar);
      return 0;
   }
```  
Hơn nữa, constructor được đánh dấu bởi từ khóa _explicit_ sẽ không thể được gọi với cú pháp dạng gán (=). Như ở ví dụ dưới đây, đối tượng **_bar_** sẽ không thể được khởi tạo:
```C++
   B bar = foo;
```  
Các hàm thành viên chuyển kiểu (được mô tả ở ví dụ trước) có thể được đặc tả với từ khóa _explicit_. Nó ngăn việc chuyển kiểu ngầm định theo cái cách mà constructor _explicit_ làm với kiểu dữ liệu đích.
### 4. KHUÔN KIỂU (TYPE CASTING)

C++ là một ngôn ngữ nhạy kiểu. Nhiều trường hợp chuyển kiểu, đặc biệt là những trường hợp ngụ ý cách phiên dịch khác của giá trị, yêu cầu chuyển kiểu tường minh, được biết đến trong C++ với tên gọi **chuyển kiểu (type casting)**. Có 2 kiểu cú pháp chính cho việc chuyển kiểu tổng quan này: **hướng hàm (functional)** và **kiểu-C (c-like)**:
```C++
   double x = 10.3;
   int y;
   y = int (x);      //functional notation
   y = (int) x;      //c-like cast notation
```
Chức năng của dạng chuyển kiểu tổng quan này đáp ứng hầu hết các nhu cầu đối với các kiểu dữ liệu cơ bản. Tuy nhiên, những toán tử này cũng có thể được ứng dụng "bừa bãi" trên các class và con trỏ class, điều này dẫn tới nguy cơ xuất hiện lỗi runtime dù chính xác về mặt cú pháp. Như ở ví dụ sau, chương trình sẽ được biên dịch thành công mà không có lỗi:
```C++
   // class type-casting
   #include <iostream>
   using namespace std;

   class Dummy {
      double i, j;
   };

   class Addition {
      int x, y;
   public:
      Addition (int a, int b) {x = a; y = b;}
      int result () {return x + y;}
   };

   int main () {
      Dummy d;
      Addition * padd;
      padd = (Addition*) &d;
      cout << padd->result ();
      return 0;
   }
```
Chương trình khai báo một biến con trỏ đến class **_Addition_**, nhưng sau đó gán cho nó một tham chiếu tới một kiểu dữ liệu không liên quan bằng cách sử dụng chuyển kiểu tường minh:
```C++
   padd = (Addition*) &d;
```  
Phép chuyển kiểu không tường minh không bị hạn chế cho phép chuyển đổi bất kì con trỏ nào thành bất kì 1 kiểu con trỏ khác độc lập với kiểu dữ liệu mà nó trỏ tới. Theo sau là lời gọi đến thành viên result sẽ phát sinh ra lỗi runtime hoặc một lỗi khác không ngờ đến.
Để kiểm soát những loại chuyển kiểu giữa các class, chúng ta có 4 toán tử tổng quát: _dynamic_cast_, _reinterpret_cast_, _static_cast_ và _const_cast_. Định dạng của chúng là kiểu dữ liệu mới được đặt trong cặp **dấu ngoặc nhọn <>** và ngay sau đó là thể hiện chuyển đổi được đặt trong cặp **dấu ngoặc đơn ()**:
```C++
   dynamic_cast <new_type> (expression)
   reinterpret_cast <new_type> (expression)
   static_cast <new_type> (expression)
   const_cast<new_type> (expression)
```
Phép chuyển kiểu truyền thống tương đương với những thể hiện này là:
```C++
   (new_type) expression
    new_type (expression)
```
tuy nhiên mỗi kiểu trong số chúng sẽ có những đặc tính riêng biệt:
#### 4.1. DYNAMIC_CAST
_dynamic_cast_ chỉ có thể dùng với con trỏ và tham chiếu đến class (hoặc với _void*_). Mục đích của nó là để đảm bảo kết quả của phép chuyển kiểu nhắm tới một đối tượng hoàn chỉnh hợp lệ của kiểu con trỏ đích.
Nó vốn bao gồm con trỏ upcast (chuyển đổi từ con trỏ đến lớp dẫn xuất thành con trỏ đến lớp cơ sở), theo một cách tương tự được cho phép như chuyển đổi tường minh.
Tuy nhiên, _dynamic_cast_ cũng có thể là downcast (chuyển đổi từ con trò đến lớp cơ sở thành con trỏ đến lớp dẫn xuất) các class đa hình (với những thành phần ảo - virtual) nếu và chỉ nếu như đối tượng được trỏ tới là một đối tượng hoàn chỉnh hợp lệ của kiểu dữ liệu đích, như ví dụ sau:
```C++
 //dynamic_cast
   #include <iostream>
   #include <exception>
   using namespace std;

   class Base {virtual void dummy() {} };
   class Derived: public Base {int a; };

   int main () {
      try {
         Base * pba = new Derived;
         Base * pbb = new Base;
         Derived * pd;

         pd = dynamic_cast<Derived*> (pba);
         if (pd == 0)   cout << "Null pointer on first type-cast.\n";
        
         pd = dynamic_cast<Derived*> (pbb);
         if (pd == 0)   cout << "Null pointer on second type-cast.\n";
      }
      catch (exception &e)   {cout << "Exception: " << e.What ();}
      return 0;
   }
```
Lưu ý về tính tương hợp: kiểu của _dynamic_cast_ yêu cầu RTTI [1] để lưu vết kiểu dữ liệu động. Một vài compiler hỗ trợ tính năng này như một tùy chọn (mặc định là vô hiệu hóa). Nó cần phải được cho phép để kiểm tra kiểu runtime sử dụng _dynamic_cast_ làm việc chính xác với các kiểu dữ liệu này.
Đoạn code dưới đây thể hiện 2 phép chuyển kiểu động từ đối tượng con trỏ của kiểu _Base*_ (**_pba_** và **_pbb_**) đến con trỏ đối tượng của kiểu _Derived*_, tuy nhiên chỉ có phép chuyển đầu tiên là thành công:
```C++
  Base * pba = new Derived;
  Base * pbb = new Base;
```
Đoạn code dưới đây thể hiện 2 phép chuyển kiểu động từ đối tượng con trỏ của kiểu _Base*_ (**_pba_** và **_pbb_**) đến con trỏ đối tượng của kiểu _Derived*_, tuy nhiên chỉ có phép chuyển đầu tiên là thành công:

Cho dù cả 2 đều là pointer thuộc kiểu _Base*_, **_pba_** đang trỏ tới đối tượng thuộc kiểu **_Derived_**, trong khi **_pbb_** trỏ tới đối tượng thuộc kiểu **_Base_**. Bởi vậy, khi từng phép chuyển kiểu tương ứng được thể hiện sử dụng _dynamic_cast_, **_pba_** trỏ tới một đối tượng hoàn chỉnh thuộc class **_Derived_** còn **_pbb_** trỏ tới đối tượng thuộc class **_Base_** là một đối tượng không hoàn chỉnh của class **_Derived_**.

Khi _dynamic_cast_ không thể chuyển một pointer vì nó không phải một đối tượng hoàn chỉnh của class yêu cầu - mà ở trong ví dụ trên là phép chuyển thứ 2 - nó trả về null pointer để chỉ ra rằng việc gán thất bại. Nếu _dynamic_cast_ được sử dụng để chuyển thành kiểu tham chiếu và phép chuyển không khả thi thì một biệt lệ thuộc kiểu bad_cast sẽ được ném ra. _dynamic_cast_ còn có thể thể hiện các phép chuyển ngầm định khác được cho phép trên pointer: chuyển con trỏ null giữa các kiểu con trỏ (kể cả giữa các class không có liên hệ) và chuyển bất kì pointer của bất kì kiểu dữ liệu nào thành con trỏ _void*_.
#### 4.2. STATIC_CAST
_static_cast_ có thể thể hiện việc chuyển đổi con trỏ giữa các class có liên hệ với nhau, không chỉ là upcasts mà còn có downcasts . Không có sự kiểm tra nào được thực hiện trong suốt runtime để đảm bảo rằng đối tương đang được chuyển đổi là một đối tượng hoàn chỉnh của kiểu dữ liệu đích. Cho nên việc đảm bảo chuyển đổi là an toàn hoàn toàn phụ thuộc vào lập trình viên.
Ở một khía cạnh khác, nó không phát sinh chi phí kiểm tra an toàn của _dynamic_cast_:
```C++
 class Base {};
 class Derived: public Base {};
 Base* a = new Base;
 Derived* b = static_cast<Derived*>(a);
```
Đoạn mã trên hợp lệ mặc dù **_b_** có thể trỏ tới một đối tượng chưa hoàn thiện của class và có thể dẫn tới lỗi runtime nếu truy cập vào cùng nhớ mà con trỏ đó trỏ tới. 

Do đó, _static_cast_ có thể thể hiện các con trỏ của các class cho phép chuyển kiểu ngầm định và tường minh. 

_static_cast_ đồng thời cũng có thể thể hiện toàn bộ các dạng chuyển đổi ngầm định và tường minh (không chỉ với con trỏ đối tượng):
* Chuyển đổi từ _void*_ thành bất kì kiểu con trỏ nào. Trong trường hợp này, nó đảm bảo rằng nếu giá trị _void*_ đạt được bằng cách chuyển đổi từ cùng loại con trỏ, giá trị con trỏ kết quả là tương đượng.
* Chuyển đổi giá trị nguyên, thực và kiểu enum thành kiểu _enum_.

Hơn nữa, _static_cast_ cũng thể hiện các tính năng sau:
* Chuyển đổi tường minh constructor đơn đối số hoặc toán tử chuyển đổi.
* Chuyển sang dạng tham chiếu rvalue.
* Chuyển các giá trị _enum_ của class sang giá trị nguyên hoặc thực.
* Chuyển bất kì kiểu nào sang _void_, ước lượng và loại bỏ giá trị.
#### 4.3. REINTERPRET_CAST

_reinterpret_cast_ chuyển đổi bất kì kiểu con trỏ nào thành bất kỳ kiểu con trỏ khác cho dù là giữa các class không có mối liên hệ. Kết quả đạt được là một bản sao nhị phân đơn giản giá trị từ một con trỏ đến một con trỏ khác. Tất cả các phép chuyển đổi pointer đều được cho phép.

Nó cũng có thể cast con trỏ từ hoặc đến kiểu dữ liệu _int_. Định dạng mà một giá trị nguyên đại diện cho con trỏ thì sẽ **phụ thuộc vào nền tảng (platform-specific)**. Yếu tố duy nhất được đảm bảo là con trỏ được chuyển sang kiểu số nguyên đủ lớn để chứa nó, cũng như có thể chuyển ngược lại thành con trỏ hợp lệ.
```C++
   class A { /* ... */ };
   class B { /* ... */ };
   A *a = new A;
   B *b = reinterpret_cast<B*>(a);
```
Trong đoạn mã này, b trỏ tới một đối tượng hoàn toàn không liên quan và tương thích. Việc dereference [2] trong trường hợp này là không an toàn.

#### 4.4. CONST_CAST
 Loại chuyển kiểu này vận hành sự khai báo hằng đối tượng được trỏ tới bởi con trỏ, hoặc được đặt vào một tập hợp nào đó, hay bị loại bỏ. Ví dụ, để chuyển một hằng con trỏ vào hàm mong đợi một đối số không phải hằng:
```C++
   //const_cast

   #include <iostream>
   using namespace std;

   void print (char * str)
   {
      cout << str << '\n';
   }

   int main () {
      const char * c = "sample test";
      print (const_cast <char*> (c) );
      return 0;
   }
```
Ví dụ bên trên đảm bảo được thực hiện bởi vì hàm print không in ra đối tượng được trỏ tới. Lưu ý rằng việc loại bỏ tính hằng của đối tượng được trỏ tới để in nó ra sẽ gây ra lỗi **undefined behavior**.
### 5. TYPEID

_typeid_ cho phép kiểm tra kiểu của một expression:
```C++
   typeid (expression)
```
Toán tử này trả về tham chiếu tới đối tượng hằng của kiểu type_info được định nghĩa trong standard header **_< typeinfo >_**. Giá trị trả về bởi _typeid_ có thể được so sánh với các giá trị trả về khác của _typeid_ sử dụng các toán tử so sánh == và != hoặc có thể sử dụng để nhận chuỗi kí tự thể hiện tên kiểu dữ liệu hoặc tên class bằng cách sử dụng phương thức _name()_.
```C++
   #include <iostream>
   #include <typeinfo>
   using namespace std;

   int main () {
      int *a, b;
      a = 0, b = 0;
      if (typeid (a) != typeid (b))
      {
          cout << "a and b is in different type." << endl;
          cout << "Type of a is " << typeid (a). name << endl;
          cout << "Type of b is " << typeid (b). name << endl;
      }
      return 0;
   }
```
Khi sử dụng _typeid_ cho các class, nó sẽ sử dụng RTTI để lưu vết kiểu của đối tượng động.

Khi _typeid_ được sử dụng cho một expression có kiểu là 1 class đa hình, kết quả sẽ là kiểu của đối tượng dẫn xuất hoàn chỉnh nhất:
```C++
   //typeid, polymorphic class
   #include <iostream>
   #include <typeinfo>
   #include <exception>
   using namespace std;

   class Base {virtual void f () {}};
   class Derived : public Base {};

   int main () {
      try {
         Base* a = new Base;
         Base* b = new Derived;
         cout << "a is: " << typeid (a).name() << endl;
         cout << "b is: " << typeid (b).name() << endl;
         cout << "*a is: " << typeid (*a).name() << endl;
         cout << "*b is: " << typeid (*b).name() << endl;
      }
      catch (exception &e) {
         cout << "Exception: " << e.what() << endl;
      }
      return 0;
   }
```
---
**CHÚ THÍCH**

* [1] **RTTI (Runtime type information - thông tin kiểu thời gian thực thi)**: một cơ chế của ngôn ngữ lập trình C++ để đưa ra thông tin về kiểu dữ liệu của đối tượng tại **thời điểm thực thi (runtime)**. Cơ chế này có thể được áp dụng cho các kiểu dữ liệu đơn giản như kiểu số nguyên hay kiểu số thực hay các kiểu dữ liệu chung (generic: _typedef_ **_< typename T >_**...).
* [2] **deference**: tham chiếu ngược, để lấy về giá trị của dữ liệu chứa trong địa chỉ mà con trỏ đó trỏ vào.
---
