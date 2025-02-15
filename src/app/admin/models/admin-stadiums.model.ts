export interface StadiumsModel {
  id: number,
  createdAt: Date,
  createdBy: number,
  updatedAt: Date,
  updatedBy: number,
  stadiumName: string,
  city: string,
  town: string,
  address: string,
  phoneNumber: string,
  imagePath: string,
  imageAttachment: File,
  audienceCapacity: number,
  sizeLength: number,
  sizeWidth: number,
  floorType: string,
  hasLightning: boolean,
  hasSeating: boolean,
  hasDisabledTribune: boolean,
  hasClosedCircuitCameraSystem: boolean,
  longitude: number,
  latitude: number,
  mapUrl: string
}
