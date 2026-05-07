export interface PushSubscriptionDto {
  endpoint: string
  public_key: string
  auth_token: string
}

export type PushPermissionState = 'default' | 'granted' | 'denied' | 'unsupported'
