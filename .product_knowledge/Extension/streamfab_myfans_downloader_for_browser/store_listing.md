# [StreamFab 浏览器插件] - [myfans] - 上架信息

> 模板说明：参考 U-NEXT `store_listing.md` 生成。截图素材、Search terms 等待发版前手工补齐。

---

## Chrome

### Store listing

<!-- colwidth:11.39%,88.61% -->
| 字段名 | 信息 |
| --- | --- |
| 插件名称 | StreamFab myfans Downloader for Browser |
| 简要描述 | Assist with managing and saving myfans videos for offline viewing in supported scenarios. |
| 完整描述 | StreamFab myfans Downloader is designed to help users manage and save myfans video content for offline viewing in supported scenarios.<br>This extension is compatible with myfans sites.<br>It prioritizes stability, clarity, and control, offering a streamlined experience tailored specifically for myfans use cases.Key FeaturesDesigned exclusively for myfans video pagesSaves videos in commonly used video formats, depending on availabilitySupports selection of available audio tracks and subtitle languagesAutomatically detects playable video resources on myfans pagesSupports sequential processing of multiple posts within a creator feedProvides controlled task handling with queue managementSupports batch processing and automatic handling of newly published creator videos when availablePreserves basic video information such as title, creator, and post detailsOffers a multilingual user interface for better accessibilityIncludes a trial version with optional licensing optionsTechnology and Privacy Commitment This extension uses a local companion application (Coapp) to assist with video processing.<br>All processing is performed locally on the user's device.<br>The extension does not collect, store, or transmit personal data, browsing history, account credentials, or myfans account information.<br>Users are guided to install the local companion component only when required for supported features.Important NoticeThis extension works only with myfans video content that is compatible with standard browser-based playback technologies. Some content may not be supported due to technical or platform limitations.Successful processing is not guaranteed for all titles, regions, or accounts, and may vary based on content type and system environment.This tool is intended solely for personal use with content that the user is authorized to access. Users are responsible for complying with myfans's terms of service and applicable local laws.The developer does not host, distribute, or provide any myfans content and assumes no responsibility for third-party content usage. |
| 插件类别 | / |
| 截图 | Global screenshots<br>Small promo tile<br>Marquee promo tile |
| 权限说明 | / |
| 网站支持链接 | [https://streamfab.dvdfab.cn/streamfab-for-browser.htm](https://streamfab.dvdfab.cn/streamfab-for-browser.htm) |

### Privacy

| 字段 | 填写内容 |
| --- | --- |
| activeTab justification | The activeTab permission is used only for myfans pages when the user clicks the extension icon. It provides temporary access to the current page's URL and title to detect available videos and show download options. No browsing history or personal data is collected. |
| nativeMessaging justification | Required to enable secure communication between the browser extension and the desktop companion app (coapp). It allows the extension to send video information for processing or downloading. |
| storage justification | The storage permission is used exclusively to save the user's preferences and configuration data on their local machine.<br>This includes non-sensitive information such as:Preferred video quality (e.g., 1080p, 360p).Last-used download directory path (transmitted securely to the StreamFab myfans CoApp).Other interfaces or feature settings. This data is stored locally to enhance user experience, allowing for personalized and efficient subsequent downloads. Crucially, this stored information is never transmitted to any external server or monitored by the extension. |
| tabs justification | The tabs permission is used only for myfans pages when a user interacts with the extension. It allows the extension to read the URL and title of open myfans tabs to detect downloadable videos and display them in a centralized list. No page content beyond URLs/titles is accessed, and no browsing history or personal data is collected. |
| cookies justification | Used to read login-related cookies from streaming websites, ensuring that authenticated sessions are recognized by the coapp when accessing videos. No cookies are modified or transmitted to third parties. |
| notifications justification | The NativeMessaging permission is absolutely essential as it forms the secure and compliant technical foundation for the download function.<br>Purpose of Communication:<br>This permission enables the extension to communicate with the StreamFab Video CoApp (Companion Application)—a required local desktop program.<br>Compliance and Security Justification:<br>The extension itself does not possess permissions to directly handle high-bandwidth streaming data or write files to the user's local drive. Instead, the companion application is utilized to:Execute professional stream analysis (necessary for identifying 1080p and segmented streams).Process and execute the download task (including features like resume capability).Ensure all file operations occur securely within the user's controlled local environment. The communication is limited to passing download metadata (analyzed video URL, target file name, save path) and receiving status updates. Crucially, this process upholds the highest standards of user data privacy and local control. |
| scripting justification* | The scripting permission is required to enable the extension's core video detection and information display function.<br>This permission is used solely to:Inject a temporary content script into the current active page.Programmatically read non-personal video metadata (such as the content URL, title, and thumbnail reference) from the page's structure. This script-injection is strictly on-demand, triggered only by the user's click on the extension icon, and is essential for accurately presenting the download options. The process is temporary, local, and we do not collect or monitor any personal user data. |
| identity justification* | Identity Permission Usage Explanation<br>This extension uses the identity permission solely to support Google account sign-in.<br>The permission is required to initiate and complete the Google OAuth authentication flow and obtain the user's login authorization result.<br>The identity permission is only used for authentication purposes.<br>It is not used to access additional user data beyond what is necessary for login, nor for user tracking, cross-site identification, or advertising purposes.<br>All authorization actions are explicitly initiated by the user and comply with Chrome extension authentication guidelines. |
| webRequest justification* | All permissions are used only for myfans video downloads and are triggered strictly on user action:<br>activeTab – Temporarily accesses the current myfans page when the user clicks the extension icon, to detect available videos and show download options.<br>tabs – Accesses URLs and titles of open myfans tabs only, to provide a centralized list of downloadable videos. No page content beyond URL/title is read.<br>webRequest – Monitors network requests from myfans pages during a download to retrieve media stream data for high-quality downloads. All data is processed locally or via the companion app.<br>Data Safety: No personal data, browsing history, or activity on other websites is collected or stored. |
| sidePanel justification* | Used to display the extension interface in the browser's side panel, allowing users to view and manage download-related information conveniently. |
| Host permission justification | This plugin only accesses myfans websites to provide video download functionality. It does not access any other websites, nor does it collect data from other websites. |
| Privacy policy 隐私政策 | [https://www.dvdfab.cn/privacy.htm](https://www.dvdfab.cn/privacy.htm) |
| Remote code 远程代码 | NO |

### Test instructions

```
Dear Review Team,

Testing Instructions
To test the core functionality, please ensure that the StreamFab myfans CoApp (Companion Application) is properly installed and running on the local machine. The CoApp is required to assist with supported video processing tasks and operates entirely on the user's device.

Testing Steps
- Visit myfans site and log in with a valid myfans account.
- Open a playable video post and start playing the video to initialize the stream.
- Click the StreamFab myfans Downloader extension icon in the browser toolbar.
- The extension will analyze the current myfans page and display available video processing options if supported.
- Select an available option from the extension interface.
- Start the task. The extension will pass the required processing information to the local companion application, which will perform the operation on the user's device.

Expected Behavior
- The extension only activates on myfans video pages.
- The video stream is detected only after playback starts.
- Available options depend on the content and technical conditions.
- The companion application performs all processing locally.

Notes for Reviewers
- This extension is exclusively designed for myfans and does not support any other websites or platforms.
- Some myfans content may not be supported due to technical or platform restrictions.
- Successful processing may vary depending on region, content type, and system environment.
```

### Distribution

- Payments: Free of charge
- Visibility: Public
- Distribution: All

---

## Edge

### Availability

- Visibility: Public
- Markets: Make my extension available in any future market

### Properties

1. Category: Developer Tools
2. Support details:

- Website: [https://streamfab.dvdfab.cn/streamfab-for-browser.htm](https://streamfab.dvdfab.cn/streamfab-for-browser.htm)
- Support contact detail: [dvdfab2003@gmail.com](mailto:dvdfab2003@gmail.com)

1. Mature content: Yes/No

### Privacy

Single purpose description

```
Save users' favourite videos from myfans
```

Permission justification

<!-- colwidth:12.56%,87.44% -->
| 字段 | 填写内容 |
| --- | --- |
| activeTab justification | The activeTab permission is used only for myfans pages when the user clicks the extension icon. It provides temporary access to the current page's URL and title to detect available videos and show download options. No browsing history or personal data is collected. |
| nativeMessaging justification | Required to enable secure communication between the browser extension and the desktop companion app (coapp). It allows the extension to send video information for processing or downloading. |
| storage justification | The storage permission is used exclusively to save the user's preferences and configuration data on their local machine.<br>This includes non-sensitive information such as:Preferred video quality (e.g., 1080p, 360p).Last-used download directory path (transmitted securely to the StreamFab myfans CoApp).Other interfaces or feature settings. This data is stored locally to enhance user experience, allowing for personalized and efficient subsequent downloads. Crucially, this stored information is never transmitted to any external server or monitored by the extension. |
| tabs justification | The tabs permission is used only for myfans pages when a user interacts with the extension. It allows the extension to read the URL and title of open myfans tabs to detect downloadable videos and display them in a centralized list. No page content beyond URLs/titles is accessed, and no browsing history or personal data is collected. |
| cookies justification | Used to read login-related cookies from streaming websites, ensuring that authenticated sessions are recognized by the coapp when accessing videos. No cookies are modified or transmitted to third parties. |
| notifications justification | The NativeMessaging permission is absolutely essential as it forms the secure and compliant technical foundation for the download function.<br>Purpose of Communication:<br>This permission enables the extension to communicate with the StreamFab Video CoApp (Companion Application)—a required local desktop program.<br>Compliance and Security Justification:<br>The extension itself does not possess permissions to directly handle high-bandwidth streaming data or write files to the user's local drive. Instead, the companion application is utilized to:Execute professional stream analysis (necessary for identifying 1080p and segmented streams).Process and execute the download task (including features like resume capability).Ensure all file operations occur securely within the user's controlled local environment. The communication is limited to passing download metadata (analyzed video URL, target file name, save path) and receiving status updates. Crucially, this process upholds the highest standards of user data privacy and local control. |
| scripting justification* | The scripting permission is required to enable the extension's core video detection and information display function.<br>This permission is used solely to:Inject a temporary content script into the current active page.Programmatically read non-personal video metadata (such as the content URL, title, and thumbnail reference) from the page's structure. This script-injection is strictly on-demand, triggered only by the user's click on the extension icon, and is essential for accurately presenting the download options. The process is temporary, local, and we do not collect or monitor any personal user data. |
| identity justification* | Identity Permission Usage Explanation<br>This extension uses the identity permission solely to support Google account sign-in.<br>The permission is required to initiate and complete the Google OAuth authentication flow and obtain the user's login authorization result.<br>The identity permission is only used for authentication purposes.<br>It is not used to access additional user data beyond what is necessary for login, nor for user tracking, cross-site identification, or advertising purposes.<br>All authorization actions are explicitly initiated by the user and comply with Chrome extension authentication guidelines. |
| webRequest justification* | All permissions are used only for myfans video downloads and are triggered strictly on user action:<br>activeTab – Temporarily accesses the current myfans page when the user clicks the extension icon, to detect available videos and show download options.<br>tabs – Accesses URLs and titles of open myfans tabs only, to provide a centralized list of downloadable videos. No page content beyond URL/title is read.<br>webRequest – Monitors network requests from myfans pages during a download to retrieve media stream data for high-quality downloads. All data is processed locally or via the companion app.<br>Data Safety: No personal data, browsing history, or activity on other websites is collected or stored. |
| sidePanel justification* | Used to display the extension interface in the browser's side panel, allowing users to view and manage download-related information conveniently. |
| Host permission justification | This plugin only accesses myfans websites to provide video download functionality. It does not access any other websites, nor does it collect data from other websites. |
| Privacy policy 隐私政策 | [https://www.dvdfab.cn/privacy.htm](https://www.dvdfab.cn/privacy.htm) |
| Remote code 远程代码 | NO |

### **Notes for certification**

**Description**

```
Dear Review Team,
Please find attached the submission for my browser extension package, version 1001.
The extension fully complies with browser security standards and does not collect, store, or transmit any user information. Its primary function is to assist users in managing and saving myfans video content for offline viewing in supported scenarios.
Testing Instructions
- The installation of the StreamFab myfans CoApp (Companion Application) is required. This component has been thoroughly tested and operates entirely on the user's device.
- Use a valid myfans account with an active subscription to sign in and play content on myfans pages.
- Click the StreamFab myfans Downloader extension icon to initiate supported processing tasks.
- The extension will display available options for the current video and pass the selected task to the local CoApp for execution.
Test Account (for reviewer reference)
- A myfans account with an active paid subscription is required to access playable content. Reviewers may use their own subscribed account, or contact us if a test account is needed.
- Extension test account:
  Account: test-liftstreamfab_for_browser1-01@streamfab.com
Password: 123456
Thank you for your time and review.
```