export type TemplateDto = {
  id: number;
  name: string;
};

export type AlbumDto = {
  id: number;
  name: string;
  template: TemplateDto;
};

export type OrderAlbum = {
  id: number;
  albumDto: AlbumDto;
  quantity: number;
  price: number; // đơn giá
};

export type OrderUserInfo = {
  id: string;
  username: string;
  phoneNumber: string | null;
  address: string | null;
  fullname: string | null;
};

export type OrderDetail = {
  id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  userInfo: OrderUserInfo;
  phoneNumber: string | null;
  address: string | null;
  fullname: string | null;
  orderAlbums: OrderAlbum[];
};

export type OrderListItem = OrderDetail; // dùng cùng cấu trúc cho list
