import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Save, User, Bell, Shield, Palette } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

export const Route = createFileRoute('/settings/')({
  component: Settings,
});

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Frontend developer passionate about React and modern web technologies.',
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyDigest: true,
    },
    appearance: {
      theme: 'light',
      language: 'en',
    },
    privacy: {
      profileVisibility: 'public',
      dataSharing: false,
    },
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  const handleSave = () => {
    // In a real app, this would save to an API
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button
          onClick={handleSave}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            
            <TabsContent value="profile">
              <ProfileSettings 
                settings={settings.profile}
                updateSetting={(key, value) => updateSetting('profile', key, value)}
              />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationSettings 
                settings={settings.notifications}
                updateSetting={(key, value) => updateSetting('notifications', key, value)}
              />
            </TabsContent>
            
            <TabsContent value="appearance">
              <AppearanceSettings 
                settings={settings.appearance}
                updateSetting={(key, value) => updateSetting('appearance', key, value)}
              />
            </TabsContent>
            
            <TabsContent value="privacy">
              <PrivacySettings 
                settings={settings.privacy}
                updateSetting={(key, value) => updateSetting('privacy', key, value)}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function ProfileSettings({ settings, updateSetting }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile Settings</h3>
        <p className="text-sm text-muted-foreground">
          Update your personal information and profile details.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={settings.name}
            onChange={(e) => updateSetting('name', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={settings.email}
            onChange={(e) => updateSetting('email', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={settings.bio}
            onChange={(e) => updateSetting('bio', e.target.value)}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}

function NotificationSettings({ settings, updateSetting }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications and updates.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Email Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
          </div>
          <Switch
            checked={settings.emailNotifications}
            onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label>Push Notifications</Label>
            <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
          </div>
          <Switch
            checked={settings.pushNotifications}
            onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label>Weekly Digest</Label>
            <p className="text-sm text-muted-foreground">Receive a weekly summary of activity</p>
          </div>
          <Switch
            checked={settings.weeklyDigest}
            onCheckedChange={(checked) => updateSetting('weeklyDigest', checked)}
          />
        </div>
      </div>
    </div>
  );
}

function AppearanceSettings({ settings, updateSetting }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize the look and feel of your application.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label>Theme</Label>
          <Select
            value={settings.theme}
            onValueChange={(value) => updateSetting('theme', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Language</Label>
          <Select
            value={settings.language}
            onValueChange={(value) => updateSetting('language', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function PrivacySettings({ settings, updateSetting }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Privacy Settings</h3>
        <p className="text-sm text-muted-foreground">
          Control your privacy and data sharing preferences.
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label>Profile Visibility</Label>
          <Select
            value={settings.profileVisibility}
            onValueChange={(value) => updateSetting('profileVisibility', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="friends">Friends Only</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label>Data Sharing</Label>
            <p className="text-sm text-muted-foreground">Allow sharing of anonymized data for analytics</p>
          </div>
          <Switch
            checked={settings.dataSharing}
            onCheckedChange={(checked) => updateSetting('dataSharing', checked)}
          />
        </div>
      </div>
    </div>
  );
}