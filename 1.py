import qrcode

# 目标链接
url = "https://ading163.github.io/SGEI-Email-Template/"

# 生成二维码
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(url)
qr.make(fit=True)

# 生成二维码图片
img = qr.make_image(fill_color="black", back_color="white")

# 保存二维码为文件
img.save("open_link_qr.png")

print("二维码已生成，文件名为 open_link_qr.png")
