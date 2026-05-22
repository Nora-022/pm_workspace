# [StreamFab 浏览器插件] - [{SiteName}] - 上架信息

> 模板说明：`{SiteName}` 由 scaffold_plugin.py 在 init 阶段自动替换为 display_name。其他字段如截图素材、Search terms 待发版前手工补齐。

---

## Chrome

### Store listing

<table>
<thead><tr><th>字段名</th><th>信息</th></tr></thead>
<tbody>
<tr><td>插件名称</td><td>StreamFab {SiteName} Downloader for Browser</td></tr>
<tr><td>简要描述</td><td>Assist with managing and saving {SiteName} videos for offline viewing in supported scenarios.</td></tr>
<tr><td>完整描述</td><td>
StreamFab {SiteName} Video Downloader is designed to help users manage and save {SiteName} video content for offline viewing in supported scenarios.<br/>
This extension is compatible with {SiteName} sites.<br/>
It prioritizes stability, clarity, and control, offering a streamlined experience tailored specifically for {SiteName} use cases.
<h4>Key Features</h4>
<ul>
<li>Designed exclusively for {SiteName} video pages</li>
<li>Saves videos in commonly used video formats, depending on availability</li>
<li>Supports selection of available audio tracks and subtitle languages</li>
<li>Automatically detects playable video resources on {SiteName} pages</li>
<li>Supports sequential processing of multiple episodes within a series</li>
<li>Provides controlled task handling with queue management</li>
<li>Preserves basic video information such as title, season, and episode details</li>
<li>Offers a multilingual user interface for better accessibility</li>
<li>Includes a trial version with optional licensing options</li>
</ul>
<h4>Technology and Privacy Commitment</h4>
This extension uses a local companion application (Coapp) to assist with video processing.<br/>
All processing is performed locally on the user's device.<br/>
The extension does not collect, store, or transmit personal data, browsing history, account credentials, or {SiteName} account information.<br/>
Users are guided to install the local companion component only when required for supported features.
<h4>Important Notice</h4>
<ul>
<li>This extension works only with {SiteName} video content that is compatible with standard browser-based playback technologies. Some content may not be supported due to technical or platform limitations.</li>
<li>Successful processing is not guaranteed for all titles, regions, or accounts, and may vary based on content type and system environment.</li>
<li>This tool is intended solely for personal use with content that the user is authorized to access. Users are responsible for complying with {SiteName}'s terms of service and applicable local laws.</li>
<li>The developer does not host, distribute, or provide any {SiteName} content and assumes no responsibility for third-party content usage.</li>
</ul>
</td></tr>
<tr><td>插件类别</td><td>/</td></tr>
<tr><td>截图</td><td>Global screenshots<br/>Small promo tile<br/>Marquee promo tile</td></tr>
<tr><td>权限说明</td><td>/</td></tr>
<tr><td>网站支持链接</td><td>https://streamfab.dvdfab.cn/streamfab-for-browser.htm</td></tr>
</tbody>
</table>

### Privacy

<table>
<thead><tr><th>字段</th><th>填写内容</th></tr></thead>
<tbody>
<tr><td>activeTab justification</td><td>The activeTab permission is used only for {SiteName} pages when the user clicks the extension icon. It provides temporary access to the current page's URL and title to detect available videos and show download options. No browsing history or personal data is collected.</td></tr>
<tr><td>nativeMessaging justification</td><td>Required to enable secure communication between the browser extension and the desktop companion app (coapp). It allows the extension to send video information for processing or downloading.</td></tr>
<tr><td>storage justification</td><td>
The storage permission is used exclusively to save the user's preferences and configuration data on their local machine.<br/>
This includes non-sensitive information such as:
<ol>
<li>Preferred video quality (e.g., 4K, 1080p).</li>
<li>Last-used download directory path (transmitted securely to the StreamFab {SiteName} CoApp).</li>
<li>Other interfaces or feature settings.</li>
</ol>
This data is stored locally to enhance user experience, allowing for personalized and efficient subsequent downloads. Crucially, this stored information is never transmitted to any external server or monitored by the extension.
</td></tr>
<tr><td>tabs justification</td><td>The tabs permission is used only for {SiteName} pages when a user interacts with the extension. It allows the extension to read the URL and title of open {SiteName} tabs to detect downloadable videos and display them in a centralized list. No page content beyond URLs/titles is accessed, and no browsing history or personal data is collected.</td></tr>
<tr><td>cookies justification</td><td>Used to read login-related cookies from streaming websites, ensuring that authenticated sessions are recognized by the coapp when accessing videos. No cookies are modified or transmitted to third parties.</td></tr>
<tr><td>notifications justification</td><td>
The NativeMessaging permission is absolutely essential as it forms the secure and compliant technical foundation for the download function.<br/>
Purpose of Communication:<br/>
This permission enables the extension to communicate with the StreamFab Video CoApp (Companion Application)—a required local desktop program.<br/>
Compliance and Security Justification:<br/>
The extension itself does not possess permissions to directly handle high-bandwidth streaming data or write files to the user's local drive. Instead, the companion application is utilized to:
<ol>
<li>Execute professional stream analysis (necessary for identifying 1080p/4K and segmented streams).</li>
<li>Process and execute the download task (including features like resume capability).</li>
<li>Ensure all file operations occur securely within the user's controlled local environment.</li>
</ol>
The communication is limited to passing download metadata (analyzed video URL, target file name, save path) and receiving status updates. Crucially, this process upholds the highest standards of user data privacy and local control.
</td></tr>
<tr><td>scripting justification*</td><td>
The scripting permission is required to enable the extension's core video detection and information display function.<br/>
This permission is used solely to:
<ol>
<li>Inject a temporary content script into the current active page.</li>
<li>Programmatically read non-personal video metadata (such as the content URL, title, and thumbnail reference) from the page's structure.</li>
</ol>
This script-injection is strictly on-demand, triggered only by the user's click on the extension icon, and is essential for accurately presenting the download options. The process is temporary, local, and we do not collect or monitor any personal user data.
</td></tr>
<tr><td>webRequest justification*</td><td>
All permissions are used only for {SiteName} video downloads and are triggered strictly on user action:<br/>
activeTab – Temporarily accesses the current {SiteName} page when the user clicks the extension icon, to detect available videos and show download options.<br/>
tabs – Accesses URLs and titles of open {SiteName} tabs only, to provide a centralized list of downloadable videos. No page content beyond URL/title is read.<br/>
webRequest – Monitors network requests from {SiteName} pages during a download to retrieve media stream data for high-quality downloads. All data is processed locally or via the companion app.<br/>
Data Safety: No personal data, browsing history, or activity on other websites is collected or stored.
</td></tr>
<tr><td>sidePanel justification*</td><td>Used to display the extension interface in the browser's side panel, allowing users to view and manage download-related information conveniently.</td></tr>
<tr><td>Host permission justification</td><td>This plugin only accesses {SiteName} websites to provide video download functionality. It does not access any other websites, nor does it collect data from other websites.</td></tr>
<tr><td>Privacy policy 隐私政策</td><td>https://www.dvdfab.cn/privacy.htm</td></tr>
<tr><td>Remote code 远程代码</td><td>NO</td></tr>
</tbody>
</table>

### Test instructions

```
Dear Review Team,

Testing Instructions
To test the core functionality, please ensure that the StreamFab {SiteName} CoApp (Companion Application) is properly installed and running on the local machine. The CoApp is required to assist with supported video processing tasks and operates entirely on the user's device.

Testing Steps
- Visit {SiteName} site and log in with a valid {SiteName} account.
- Open a playable video title and start playing the video to initialize the stream.
- Click the StreamFab {SiteName} Downloader extension icon in the browser toolbar.
- The extension will analyze the current {SiteName} page and display available video processing options if supported.
- Select an available option from the extension interface.
- Start the task. The extension will pass the required processing information to the local companion application, which will perform the operation on the user's device.

Expected Behavior
- The extension only activates on {SiteName} video pages.
- The video stream is detected only after playback starts.
- Available options depend on the content and technical conditions.
- The companion application performs all processing locally.

Notes for Reviewers
- This extension is exclusively designed for {SiteName} and does not support any other websites or platforms.
- Some {SiteName} content may not be supported due to technical or platform restrictions.
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
   - Website: https://streamfab.dvdfab.cn/streamfab-for-browser.htm
   - Support contact detail: dvdfab2003@gmail.com
3. Mature content: Yes/No

### Privacy

#### Single purpose description

```
Save users' favourite videos from {SiteName}
```

#### Permission justification

<table>
<thead><tr><th>字段</th><th>填写内容</th></tr></thead>
<tbody>
<tr><td>activeTab justification</td><td>The activeTab permission is used only for {SiteName} pages when the user clicks the extension icon. It provides temporary access to the current page's URL and title to detect available videos and show download options. No browsing history or personal data is collected.</td></tr>
<tr><td>nativeMessaging justification</td><td>Required to enable secure communication between the browser extension and the desktop companion app (coapp). It allows the extension to send video information for processing or downloading.</td></tr>
<tr><td>storage justification</td><td>
The storage permission is used exclusively to save the user's preferences and configuration data on their local machine.<br/>
This includes non-sensitive information such as:
<ol>
<li>Preferred video quality (e.g., 4K, 1080p).</li>
<li>Last-used download directory path (transmitted securely to the StreamFab {SiteName} CoApp).</li>
<li>Other interfaces or feature settings.</li>
</ol>
This data is stored locally to enhance user experience, allowing for personalized and efficient subsequent downloads. Crucially, this stored information is never transmitted to any external server or monitored by the extension.
</td></tr>
<tr><td>tabs justification</td><td>The tabs permission is used only for {SiteName} pages when a user interacts with the extension. It allows the extension to read the URL and title of open {SiteName} tabs to detect downloadable videos and display them in a centralized list. No page content beyond URLs/titles is accessed, and no browsing history or personal data is collected.</td></tr>
<tr><td>cookies justification</td><td>Used to read login-related cookies from streaming websites, ensuring that authenticated sessions are recognized by the coapp when accessing videos. No cookies are modified or transmitted to third parties.</td></tr>
<tr><td>notifications justification</td><td>
The NativeMessaging permission is absolutely essential as it forms the secure and compliant technical foundation for the download function.<br/>
Purpose of Communication:<br/>
This permission enables the extension to communicate with the StreamFab Video CoApp (Companion Application)—a required local desktop program.<br/>
Compliance and Security Justification:<br/>
The extension itself does not possess permissions to directly handle high-bandwidth streaming data or write files to the user's local drive. Instead, the companion application is utilized to:
<ol>
<li>Execute professional stream analysis (necessary for identifying 1080p/4K and segmented streams).</li>
<li>Process and execute the download task (including features like resume capability).</li>
<li>Ensure all file operations occur securely within the user's controlled local environment.</li>
</ol>
The communication is limited to passing download metadata (analyzed video URL, target file name, save path) and receiving status updates. Crucially, this process upholds the highest standards of user data privacy and local control.
</td></tr>
<tr><td>scripting justification*</td><td>
The scripting permission is required to enable the extension's core video detection and information display function.<br/>
This permission is used solely to:
<ol>
<li>Inject a temporary content script into the current active page.</li>
<li>Programmatically read non-personal video metadata (such as the content URL, title, and thumbnail reference) from the page's structure.</li>
</ol>
This script-injection is strictly on-demand, triggered only by the user's click on the extension icon, and is essential for accurately presenting the download options. The process is temporary, local, and we do not collect or monitor any personal user data.
</td></tr>
<tr><td>identity justification*</td><td>
Identity Permission Usage Explanation<br/>
This extension uses the identity permission solely to support Google account sign-in.<br/>
The permission is required to initiate and complete the Google OAuth authentication flow and obtain the user's login authorization result.<br/>
The identity permission is only used for authentication purposes.<br/>
It is not used to access additional user data beyond what is necessary for login, nor for user tracking, cross-site identification, or advertising purposes.<br/>
All authorization actions are explicitly initiated by the user and comply with Chrome extension authentication guidelines.
</td></tr>
<tr><td>webRequest justification*</td><td>
All permissions are used only for {SiteName} video downloads and are triggered strictly on user action:<br/>
activeTab – Temporarily accesses the current {SiteName} page when the user clicks the extension icon, to detect available videos and show download options.<br/>
tabs – Accesses URLs and titles of open {SiteName} tabs only, to provide a centralized list of downloadable videos. No page content beyond URL/title is read.<br/>
webRequest – Monitors network requests from {SiteName} pages during a download to retrieve media stream data for high-quality downloads. All data is processed locally or via the companion app.<br/>
Data Safety: No personal data, browsing history, or activity on other websites is collected or stored.
</td></tr>
<tr><td>sidePanel justification*</td><td>Used to display the extension interface in the browser's side panel, allowing users to view and manage download-related information conveniently.</td></tr>
<tr><td>Host permission justification</td><td>This plugin only accesses {SiteName} websites to provide video download functionality. It does not access any other websites, nor does it collect data from other websites.</td></tr>
<tr><td>Privacy policy 隐私政策</td><td>https://www.dvdfab.cn/privacy.htm</td></tr>
<tr><td>Remote code 远程代码</td><td>NO</td></tr>
</tbody>
</table>

### Store Listing

**Description**

```
StreamFab {SiteName} Video Downloader is designed to help users manage and save {SiteName} video content for offline viewing in supported scenarios.
This extension is compatible with {SiteName} sites.
It prioritizes stability, clarity, and control, offering a streamlined experience tailored specifically for {SiteName} use cases.

Key Features
- Designed exclusively for {SiteName} video pages
- Saves videos in commonly used video formats, depending on availability
- Supports selection of available audio tracks and subtitle languages
- Automatically detects playable video resources on {SiteName} pages
- Supports sequential processing of multiple episodes within a series
- Provides controlled task handling with queue management
- Preserves basic video information such as title, season, and episode details
- Offers a multilingual user interface for better accessibility
- Includes a trial version with optional licensing options

Technology and Privacy Commitment
This extension uses a local companion application (Coapp) to assist with video processing.
All processing is performed locally on the user's device.
The extension does not collect, store, or transmit personal data, browsing history, account credentials, or {SiteName} account information.
Users are guided to install the local companion component only when required for supported features.

Important Notice
- This extension works only with {SiteName} video content that is compatible with standard browser-based playback technologies. Some content may not be supported due to technical or platform limitations.
- Successful processing is not guaranteed for all titles, regions, or accounts, and may vary based on content type and system environment.
- This tool is intended solely for personal use with content that the user is authorized to access. Users are responsible for complying with {SiteName}'s terms of service and applicable local laws.
- The developer does not host, distribute, or provide any {SiteName} content and assumes no responsibility for third-party content usage.
```

**Search terms**

待发版前手工填写。
