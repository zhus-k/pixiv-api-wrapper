# **pixiv-api-wrapper**

A type safe wrapper for Pixiv App API.

## **How to use**

### **Authentication**

It recommended you authenticate with Refresh Token as ID authentication can easily produce errors in from browser processes. To retrieve your Refresh Token you may try to authenticate through Options 2 or 3 or through [another program][^f1].

#### **Authentication Options**:

1. Authenticate with Refresh Token (Recommended)
```typescript 
const client = await PixivApi.create("<your refresh token>");
```

2. Authenticating with ID (Not recommended) *see* [1]
```typescript 
const browser = await puppeteer.launch({ headless: 'new' });
const client = await PixivApi.create({ userId, password }, browser);
```

3. Complete authentication in an opened browser *see* [2]
```typescript 
const client = await PixivApi.create({ userId, password });
```

#### **Retrieve Authenticated User**
```typescript 
const auth = client.Auth.getAuthentication();
const { accessToken, refreshToken, user } = auth;
```

### **API**

```typescript 
const illustDetail = await client.Illust.detail("<artworkId>");
```

### **Util**

#### Downloading illustrations

```typescript 
const illustDetail = await client.Illust.detail("<artworkId>");
const downloadResults = await Utils.downloadIllusts(illustDetail);
	for (const result of downloadResults) {
		if (result.status == 'fulfilled') {
			const { data, metadata: { fileName, fileExtension } } = result.value;
					// save to file or do something else
			fs.writeFileSync(`${fileName}.${fileExtension}`, data);
		} else {
			const { reason } = result;
      		// handle 'rejected'
		}
	}
```

#### Downloading gif

```typescript 
const ugoiraMetadata = await client.Ugoira.metadata("<artworkId>");
const { metadata: { fileName, fileExtension }, data } = await Utils.downloadUgoira(ugoiraMetadata);
fs.writeFileSync(`${fileName}.${fileExtension}`, data);
```

---

[1]: Puppeteer is **optional**, however it is **required if** you choose to authenticate by ID in a *headless* browser.
Recommended to use ['puppeteer-chromium-resolver'](https://www.npmjs.com/package/puppeteer-chromium-resolver) if you find difficulty.

[2]: If no puppeteer browser is provided, you will be prompted to enter a code by having to manually complete the login in the opened browser [[source]][^f1]:
1. Open dev console (F12) and switch to network tab.
2. Enable persistent logging ("Preserve log").
3. Type into the filter field: callback?
4. Proceed with Pixiv login.
5. After logging in you should see a blank page and request that looks like this: https://app-api.pixiv.net/web/v1/users/auth/pixiv/callback?state=...&code=.... Copy value of the code parameter into the prompt and hit the Enter key.

[^f1]: https://gist.github.com/ZipFile/c9ebedb224406f4f11845ab700124362

## **License**

[MIT licensed](LICENSE)