import { OneSignal } from "react-native-onesignal";

export function tagUserCreate(tag: string, content: string) {
  OneSignal.User.addTag(tag, content);
}

export function tagUserRemove(tag: string) {
  OneSignal.User.removeTag(tag);
}

export function tagUserInfoCreate(email: string, name: string) {
  OneSignal.User.addTags({
    user_email: email,
    user_name: name,
  });
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.User.addTag("cart_item_count", itemsCount);
}
