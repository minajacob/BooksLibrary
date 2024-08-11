import { Constants } from "./constants";

export function addRemoveBookToStorage(key: string, title: string) {
    const wishlist = localStorage.getItem(Constants.WISHLIST_STORAGE_KEY);
    let $addedToWishlist = false;
    if (wishlist) {
      const list = JSON.parse(wishlist) as App.Storage.IWishlist[];
      const index = list.findIndex((l) => l.key === key);
      if (index === -1) {
        list.push({ key, title });
        $addedToWishlist = true;
      } else {
        list.splice(index, 1);
      }
      localStorage.setItem(Constants.WISHLIST_STORAGE_KEY, JSON.stringify(list));
    } else {
      localStorage.setItem(Constants.WISHLIST_STORAGE_KEY, JSON.stringify([{ key, title }]));
      $addedToWishlist = true;
    }
    return $addedToWishlist;
}

export function checkIfAddedToWishlist(key: string) {
    const wishlist = localStorage.getItem(Constants.WISHLIST_STORAGE_KEY);
    if (wishlist) {
      const list = JSON.parse(wishlist) as App.Storage.IWishlist[];
      const index = list.findIndex((l) => l.key === key);
      if (index !== -1) {
        return true;
      }
    }
    return false;
}