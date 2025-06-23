import { lazy } from 'react';

const SocialMediaTools = lazy(() => import('@/pages/SocialMediaTools'));
const InstagramBioGenerator = lazy(() => import('@/pages/InstagramBioGenerator'));
const HashtagGenerator = lazy(() => import('@/pages/HashtagGenerator'));
const SocialMediaImageResizer = lazy(() => import('@/pages/SocialMediaImageResizer'));
const PostSchedulerPlanner = lazy(() => import('@/pages/PostSchedulerPlanner'));
const TweetGenerator = lazy(() => import('@/pages/TweetGenerator'));
const YouTubeTagExtractor = lazy(() => import('@/pages/YouTubeTagExtractor'));
const CaptionGenerator = lazy(() => import('@/pages/CaptionGenerator'));
const ProfilePictureCropper = lazy(() => import('@/pages/ProfilePictureCropper'));
const SocialMediaCharacterCounter = lazy(() => import('@/pages/SocialMediaCharacterCounter'));
const EmojiPickerInserter = lazy(() => import('@/pages/EmojiPickerInserter'));

export const socialMediaToolRoutes = [
  { path: '/social-media-tools', component: SocialMediaTools, isToolPage: false, title: "Social Media Tools" },
  { path: '/instagram-bio-generator', component: InstagramBioGenerator, isToolPage: true, title: "Instagram Bio Generator" },
  { path: '/hashtag-generator', component: HashtagGenerator, isToolPage: true, title: "Hashtag Generator" },
  { path: '/social-media-image-resizer', component: SocialMediaImageResizer, isToolPage: true, title: "Social Media Image Resizer" },
  { path: '/post-scheduler-planner', component: PostSchedulerPlanner, isToolPage: true, title: "Social Media Post Planner" },
  { path: '/tweet-generator', component: TweetGenerator, isToolPage: true, title: "Tweet Generator" },
  { path: '/youtube-tag-extractor', component: YouTubeTagExtractor, isToolPage: true, title: "YouTube Tag Extractor" },
  { path: '/caption-generator', component: CaptionGenerator, isToolPage: true, title: "Caption Generator" },
  { path: '/profile-picture-cropper', component: ProfilePictureCropper, isToolPage: true, title: "Profile Picture Cropper" },
  { path: '/social-media-character-counter', component: SocialMediaCharacterCounter, isToolPage: true, title: "Social Media Character Counter" },
  { path: '/emoji-picker', component: EmojiPickerInserter, isToolPage: true, title: "Emoji Picker & Inserter" },
];