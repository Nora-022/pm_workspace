# [StreamFab 浏览器插件] - [{SiteName}] - 上架信息

> 模板说明：`{SiteName}` 由 scaffold_plugin.py 在 init 阶段自动替换为 display_name。其他字段如截图素材、Search terms、`{StorePackageVersion}`、`{ReviewerTestAccount}` / `{ReviewerTestPassword}` 待发版前手工补齐。

---

## Chrome

### Store listing

| 字段名 | 信息 |
| --- | --- |
| 插件名称 | StreamFab {SiteName} Downloader for Browser |
| 简要描述 | Assist with managing and saving {SiteName} videos for offline viewing in supported scenarios. |
| 完整描述 | StreamFab {SiteName} Video Downloader is designed to help users manage and save {SiteName} video content for offline viewing in supported scenarios.<br>This extension is compatible with {SiteName} sites.<br>It prioritizes stability, clarity, and control, offering a streamlined experience tailored specifically for {SiteName} use cases.Key FeaturesDesigned exclusively for {SiteName} video pagesSaves videos in commonly used video formats, depending on availabilitySupports selection of available audio tracks and subtitle languagesAutomatically detects playable video resources on {SiteName} pagesSupports sequential processing of multiple episodes within a seriesProvides controlled task handling with queue managementPreserves basic video information such as title, season, and episode detailsOffers a multilingual user interface for better accessibilityIncludes a trial version with optional licensing optionsTechnology and Privacy Commitment This extension uses a local companion application (Coapp) to assist with video processing.<br>All processing is performed locally on the user's device.<br>The extension does not collect, store, or transmit personal data, browsing history, account credentials, or {SiteName} account information.<br>Users are guided to install the local companion component only when required for supported features.Important NoticeThis extension works only with {SiteName} video content that is compatible with standard browser-based playback technologies. Some content may not be supported due to technical or platform limitations.Successful processing is not guaranteed for all titles, regions, or accounts, and may vary based on content type and system environment.This tool is intended solely for personal use with content that the user is authorized to access. Users are responsible for complying with {SiteName}'s terms of service and applicable local laws.The developer does not host, distribute, or provide any {SiteName} content and assumes no responsibility for third-party content usage. |
| 插件类别 | / |
| 截图 | Global screenshots<br>Small promo tile<br>Marquee promo tile |
| 权限说明 | / |
| 网站支持链接 | <a href="https://streamfab.dvdfab.cn/streamfab-for-browser.htm" target="_blank" rel="noopener noreferrer nofollow">https://streamfab.dvdfab.cn/streamfab-for-browser.htm</a> |

### Privacy

| 字段 | 填写内容 |
| --- | --- |
| activeTab justification | The activeTab permission is used only for {SiteName} pages when the user clicks the extension icon. It provides temporary access to the current page's URL and title to detect available videos and show download options. No browsing history or personal data is collected. |
| nativeMessaging justification | Required to enable secure communication between the browser extension and the desktop companion app (coapp). It allows the extension to send video information for processing or downloading. |
| storage justification | The storage permission is used exclusively to save the user's preferences and configuration data on their local machine.<br>This includes non-sensitive information such as:Preferred video quality (e.g., 4K, 1080p).Last-used download directory path (transmitted securely to the StreamFab {SiteName} CoApp).Other interfaces or feature settings. This data is stored locally to enhance user experience, allowing for personalized and efficient subsequent downloads. Crucially, this stored information is never transmitted to any external server or monitored by the extension. |
| tabs justification | The tabs permission is used only for {SiteName} pages when a user interacts with the extension. It allows the extension to read the URL and title of open {SiteName} tabs to detect downloadable videos and display them in a centralized list. No page content beyond URLs/titles is accessed, and no browsing history or personal data is collected. |
| cookies justification | Used to read login-related cookies from streaming websites, ensuring that authenticated sessions are recognized by the coapp when accessing videos. No cookies are modified or transmitted to third parties. |
| notifications justification | The NativeMessaging permission is absolutely essential as it forms the secure and compliant technical foundation for the download function.<br>Purpose of Communication:<br>This permission enables the extension to communicate with the StreamFab Video CoApp (Companion Application)—a required local desktop program.<br>Compliance and Security Justification:<br>The extension itself does not possess permissions to directly handle high-bandwidth streaming data or write files to the user's local drive. Instead, the companion application is utilized to:Execute professional stream analysis (necessary for identifying 1080p/4K and segmented streams).Process and execute the download task (including features like resume capability).Ensure all file operations occur securely within the user's controlled local environment. The communication is limited to passing download metadata (analyzed video URL, target file name, save path) and receiving status updates. Crucially, this process upholds the highest standards of user data privacy and local control. |
| scripting justification* | The scripting permission is required to enable the extension's core video detection and information display function.<br>This permission is used solely to:Inject a temporary content script into the current active page.Programmatically read non-personal video metadata (such as the content URL, title, and thumbnail reference) from the page's structure. This script-injection is strictly on-demand, triggered only by the user's click on the extension icon, and is essential for accurately presenting the download options. The process is temporary, local, and we do not collect or monitor any personal user data. |
| webRequest justification* | All permissions are used only for {SiteName} video downloads and are triggered strictly on user action:<br>activeTab – Temporarily accesses the current {SiteName} page when the user clicks the extension icon, to detect available videos and show download options.<br>tabs – Accesses URLs and titles of open {SiteName} tabs only, to provide a centralized list of downloadable videos. No page content beyond URL/title is read.<br>webRequest – Monitors network requests from {SiteName} pages during a download to retrieve media stream data for high-quality downloads. All data is processed locally or via the companion app.<br>Data Safety: No personal data, browsing history, or activity on other websites is collected or stored. |
| sidePanel justification* | Used to display the extension interface in the browser's side panel, allowing users to view and manage download-related information conveniently. |
| Host permission justification | This plugin only accesses {SiteName} websites to provide video download functionality. It does not access any other websites, nor does it collect data from other websites. |
| Privacy policy 隐私政策 | <a href="https://www.dvdfab.cn/privacy.htm" target="_blank" rel="noopener noreferrer nofollow">https://www.dvdfab.cn/privacy.htm</a> |
| Remote code 远程代码 | NO |

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

   - Website: <a href="https://streamfab.dvdfab.cn/streamfab-for-browser.htm" target="_blank" rel="noopener noreferrer nofollow">https://streamfab.dvdfab.cn/streamfab-for-browser.htm</a>
   - Support contact detail: <a href="mailto:dvdfab2003@gmail.com" target="_blank" rel="noopener noreferrer nofollow">dvdfab2003@gmail.com</a>
3. Mature content: Yes/No

### Privacy

Single purpose description

```
Save users' favourite videos from {SiteName}
```

Permission justification

| 字段 | 填写内容 |
| --- | --- |
| activeTab justification | The activeTab permission is used only for {SiteName} pages when the user clicks the extension icon. It provides temporary access to the current page's URL and title to detect available videos and show download options. No browsing history or personal data is collected. |
| nativeMessaging justification | Required to enable secure communication between the browser extension and the desktop companion app (coapp). It allows the extension to send video information for processing or downloading. |
| storage justification | The storage permission is used exclusively to save the user's preferences and configuration data on their local machine.<br>This includes non-sensitive information such as:Preferred video quality (e.g., 4K, 1080p).Last-used download directory path (transmitted securely to the StreamFab {SiteName} CoApp).Other interfaces or feature settings. This data is stored locally to enhance user experience, allowing for personalized and efficient subsequent downloads. Crucially, this stored information is never transmitted to any external server or monitored by the extension. |
| tabs justification | The tabs permission is used only for {SiteName} pages when a user interacts with the extension. It allows the extension to read the URL and title of open {SiteName} tabs to detect downloadable videos and display them in a centralized list. No page content beyond URLs/titles is accessed, and no browsing history or personal data is collected. |
| cookies justification | Used to read login-related cookies from streaming websites, ensuring that authenticated sessions are recognized by the coapp when accessing videos. No cookies are modified or transmitted to third parties. |
| notifications justification | The NativeMessaging permission is absolutely essential as it forms the secure and compliant technical foundation for the download function.<br>Purpose of Communication:<br>This permission enables the extension to communicate with the StreamFab Video CoApp (Companion Application)—a required local desktop program.<br>Compliance and Security Justification:<br>The extension itself does not possess permissions to directly handle high-bandwidth streaming data or write files to the user's local drive. Instead, the companion application is utilized to:Execute professional stream analysis (necessary for identifying 1080p/4K and segmented streams).Process and execute the download task (including features like resume capability).Ensure all file operations occur securely within the user's controlled local environment. The communication is limited to passing download metadata (analyzed video URL, target file name, save path) and receiving status updates. Crucially, this process upholds the highest standards of user data privacy and local control. |
| scripting justification* | The scripting permission is required to enable the extension's core video detection and information display function.<br>This permission is used solely to:Inject a temporary content script into the current active page.Programmatically read non-personal video metadata (such as the content URL, title, and thumbnail reference) from the page's structure. This script-injection is strictly on-demand, triggered only by the user's click on the extension icon, and is essential for accurately presenting the download options. The process is temporary, local, and we do not collect or monitor any personal user data. |
| identity justification* | Identity Permission Usage Explanation<br>This extension uses the identity permission solely to support Google account sign-in.<br>The permission is required to initiate and complete the Google OAuth authentication flow and obtain the user's login authorization result.<br>The identity permission is only used for authentication purposes.<br>It is not used to access additional user data beyond what is necessary for login, nor for user tracking, cross-site identification, or advertising purposes.<br>All authorization actions are explicitly initiated by the user and comply with Chrome extension authentication guidelines. |
| webRequest justification* | All permissions are used only for {SiteName} video downloads and are triggered strictly on user action:<br>activeTab – Temporarily accesses the current {SiteName} page when the user clicks the extension icon, to detect available videos and show download options.<br>tabs – Accesses URLs and titles of open {SiteName} tabs only, to provide a centralized list of downloadable videos. No page content beyond URL/title is read.<br>webRequest – Monitors network requests from {SiteName} pages during a download to retrieve media stream data for high-quality downloads. All data is processed locally or via the companion app.<br>Data Safety: No personal data, browsing history, or activity on other websites is collected or stored. |
| sidePanel justification* | Used to display the extension interface in the browser's side panel, allowing users to view and manage download-related information conveniently. |
| Host permission justification | This plugin only accesses {SiteName} websites to provide video download functionality. It does not access any other websites, nor does it collect data from other websites. |
| Privacy policy 隐私政策 | <a href="https://www.dvdfab.cn/privacy.htm" target="_blank" rel="noopener noreferrer nofollow">https://www.dvdfab.cn/privacy.htm</a> |
| Remote code 远程代码 | NO |

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

发版前按以下规范生成并填写 5 个 search terms：

- 来源：优先从 `{SiteName}` 产品页 meta title、meta description、H1/H2、核心功能词、商店描述文案中提取。
- 数量：固定 5 个；每个 term 不超过 30 个字符（含空格）。
- 格式：每行 1 个 term，不加编号；英文优先使用自然短语，不堆叠关键词。
- 必须覆盖：1 个 `{SiteName}` 品牌 / 服务名 term，1-2 个通用能力 term，1-2 个用户意图 term。
- 禁止内容：无关服务名、竞品词、过度承诺词、版权规避 / 破解 / DRM 绕过相关词、重复词、未在产品能力中支持的功能词。
- 校验要求：与 Store Listing description、Single purpose description 保持一致；提交前检查去重、长度、大小写和目标商店限制。

```
{SearchTerm1}
{SearchTerm2}
{SearchTerm3}
{SearchTerm4}
{SearchTerm5}
```

**Notes for certification**

```
Dear Review Team,

Please find attached the submission for StreamFab {SiteName} Downloader for Browser, version {StorePackageVersion}.

The extension complies with browser security standards and does not collect, store, or transmit personal data, browsing history, account credentials, or {SiteName} account information. Its primary function is to assist users in managing and saving {SiteName} video content for offline viewing in supported scenarios.

Testing Instructions
- The installation of the StreamFab {SiteName} CoApp (Companion Application) is required. This component operates entirely on the user's device.
- Visit {SiteName} site and sign in with a valid {SiteName} account that has access to playable content.
- Open a supported {SiteName} video page and start playback to initialize the stream.
- Click the StreamFab {SiteName} Downloader extension icon to initiate supported processing tasks.
- The extension will display available options for the current video and pass the selected task to the local CoApp for execution.

Test Account (for reviewer reference)
- Use one of the following options before submission:
  - Provide a dedicated reviewer account with playable {SiteName} content:
    Account: {ReviewerTestAccount}
    Password: {ReviewerTestPassword}
  - Or state that reviewers may use any valid {SiteName} account with available playable content:
    {ReviewerAccountFallbackNote}

Review Notes
- This extension is designed for {SiteName} only and does not support other services or platforms.
- Supported options may vary by region, account entitlement, title availability, and technical conditions.
- All processing is performed locally through the companion application.

Thank you for your time and review.
```
