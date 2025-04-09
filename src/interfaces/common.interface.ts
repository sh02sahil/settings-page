export interface IconProps {
  className: string;
  id?: string;
}

export interface SettingsFormProps {
  id: number;
  users: string[];
  showNotifications: boolean;
  messageCategories: string[];
  replies: string[];
}
