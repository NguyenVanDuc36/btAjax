class NhanVien{
    maNhanVien = '';
    tenNhanVien = '';
    chucVu = '';
    luongCoBan = '';
    soGioLamTrongThang = '';
    heSoChucVu = '';

    constructor(manv,tennv,chucvu,luongcoban,sogiolam,heSoChucVu){
        this.maNhanVien = manv;
        this.tenNhanVien = tennv;
        this.chucVu = chucvu;
        this.luongCoBan = luongcoban;
        this.soGioLamTrongThang = sogiolam;
        this.heSoChucVu = heSoChucVu;
    };

    tinhTongLuong () { 
        return this.luongCoBan * this.heSoChucVu;
    };

    xepLoai () { 
        var xeploai='';

        if(this.soGioLamTrongThang >= 120){
            xeploai ='Nhân viên Xuất Sắc';
        } else if(this.soGioLamTrongThang >= 100 && this.soGioLamTrongThang <120){
            xeploai = 'Nhân viên giỏi';
        } else if(this.soGioLamTrongThang >= 80 && this.soGioLamTrongThang < 100){
            xeploai = 'Nhân viên khá';
        }else if(this.soGioLamTrongThang >=50 && this.soGioLamTrongThang <80){
            xeploai = 'Nhân viên trung bình';
        } else{
            xeploai = 'Không hợp lệ';
        }
        return xeploai;
    }

}
