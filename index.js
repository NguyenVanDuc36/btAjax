
function getNhanVienApi () {
 
    //ajax là phương thức bất đồng bộ => trong lúc nó thực thi gửi request đi, thì các tác vụ tiếp theo vẫn làm 
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien', //thông tin backend cung cấp
        method:'GET', //Giao thức backend cung cấp
        responseType:'json' //Kiểu dữ liệu trả về do backend cung cấp
    });

    //Hàm xử lý request thành công
    promise.then(function(result) {
        console.log(result.data);
        //Từ dữ liệu backend gửi về viết hàm hiển thị dữ liệu lên table
        renderTableNhanVien(result.data);
    });

    //Hàm xử lý request thất bại
    promise.catch(function(errors) {
        console.log('errors',errors);
    });

}



getNhanVienApi();

function renderTableNhanVien(arrSV) { //input
    

    var content = '';
    for (var index = 0; index < arrSV.length; index++) {

        var nv = arrSV[index];
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên
        var nhanVien = new NhanVien(nv.maNhanVien,nv.tenNhanVien,nv.chucVu,nv.luongCoBan,nv.soGioLamTrongThang,nv.heSoChucVu)
        //Từ đối tượng sinh viên => tạo ra thẻ tr
        var trNhanVien = `
                        <tr>
                            <td>${nhanVien.maNhanVien}</td>
                            <td>${nhanVien.tenNhanVien}</td>
                            <td>${nhanVien.chucVu}</td>
                            <td>${nhanVien.luongCoBan}</td>
                            <td>${nhanVien.tinhTongLuong()}</td>
                            <td>${nhanVien.soGioLamTrongThang}</td>
                            <td>${nhanVien.xepLoai()}</td>
                            <td>
                            <button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.maNhanVien}')" >Xoá
                            </button>
                            </td>
                        </tr>
        `;
        content += trNhanVien;
    }
    //Dom đến thẻ tblSinhVien chèn chuỗi content vào innerHTML
    document.querySelector('#tbNhanVien').innerHTML = content;
}

document.querySelector('#btnThemNV').onclick = function (event) {
    event.preventDefault();

    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    let e = document.querySelector('#chucVu');
    nhanVien.chucVu = e.options[e.selectedIndex].text;

    var kiemTraDuLieu = new Validation();
    var valid = true; 
    valid &=  kiemTraDuLieu.kiemTraRong(nhanVien.maNhanVien,'#error_required_maNhanVien','Mã nhân viên')
    & kiemTraDuLieu.kiemTraRong(nhanVien.tenNhanVien,'#error_required_tenNhanVien','Tên nhân viên')
    & kiemTraDuLieu.kiemTraRong(nhanVien.soGioLamTrongThang,'#error_required_soGio','Số giờ làm trong tháng')
    & kiemTraDuLieu.kiemTraRong(nhanVien.luongCoBan,'#error_required_luongCoBan','Lương cơ bản');
    // Kiểm tra mã nhân viên có phải số không
    valid &= kiemTraDuLieu.kiemTraTatCaSo(nhanVien.maNhanVien,'#error_allNumber_maNhanVien','Mã nhân viên');
    // Kiểm tra mã nhân viên phải từ 4 - 6 kí số
    valid &= kiemTraDuLieu.kiemTraDoDai(nhanVien.maNhanVien,'#error_length_maNhanVien',4,6,'Mã nhân viên');
    //Tên nhân viên phải là chữ
    valid &= kiemTraDuLieu.kiemTraTatCaKyTu(nhanVien.tenNhanVien,'#error_allLetter_tenNhanVien','Tên nhân viên');
    // Lương cơ bản phải từ 1 000 000 - 20 000 00
    valid &= kiemTraDuLieu.kiemTraGiaTri(nhanVien.luongCoBan,'#error_length_luongCoBan',1000000,20000000,'Lương cơ bản');
    //Số giờ làm trong tháng từ 50 - 100 giờ
    valid &= kiemTraDuLieu.kiemTraGiaTri(nhanVien.soGioLamTrongThang,'#error_length_soGio',50,150,'Giờ làm trong tháng');

    if(!valid) {
        return;
    }

    console.log('Check',nhanVien);

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien', //Đường dẫn backend yêu cầu
        method: 'POST', //Phương thức backend yêu cầu
        data: nhanVien //Dữ liệu gửi đi phải đúng định dạng
    })
    //Xử lý thành công
    promise.then(function (result) {
        console.log('result', result.data);
        //Load lại table từ api get layThongTinSinhVien
        getNhanVienApi();
    })

    //Xử lý thất bại
    promise.catch(function (error) {
        console.log('error', error.reponse.data);
    })

}


function xoaNhanVien(maNhanVienClick) {

    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVienClick}`,
        method: 'DELETE'
    });


    promise.then(function (result) {
        console.log('result', result.data);
        //Xoá thành công load lại table
        getNhanVienApi();
    });

    promise.catch(function (error) {
        console.log('error', error.response.data);
    })

}