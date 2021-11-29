import { GuildMember, MessageEmbed, MessageActionRow, MessageAttachment, Sticker, Message, PermissionString, TextChannel } from "discord.js";
/**
 * @param {GuildMember} member The guild member
 * @param {PermissionString | PermissionString[]} permissions One permission/An array of permissions to check for
 * @param {GuildChannel} channel The channel to check in (optional)
 * @param {boolean} checkAdmin Allow the admin override (true by default) 
 * @returns {boolean} Whether or not the member has the permissions
 */
export const memberHasPermissions = (
	member: GuildMember,
	permissions: PermissionString | PermissionString[],
	channel: any | null = null,
	checkAdmin = true
) => {
	if(!member) return false;
	if(!permissions) return true;
	if(typeof permissions == "string") permissions = [permissions];
	const memberPermissions = channel != null ? member.permissionsIn(channel).toArray() : member.permissions.toArray();
	if(checkAdmin && memberPermissions.includes("ADMINISTRATOR")) return true;
	for(const permission of permissions) {
		if(!memberPermissions.includes(permission)) return false;
	}
	return true;
};

/**
 * @param {TextChannel} channel The channel to send the message to
 * @param {string} content The text of the message
 * @param {MessageEmbed | MessageEmbed[]} embeds The embeds to send
 * @param {MessageActionRow} components The components of the message
 * @param {MessageAttachment | MessageAttachment[] | Object | Object[]} files The files to send
 * @param {Sticker | Sticker[]} stickers The stickers to send
 * @param {MessageAttachment | MessageAttachment[]} attachments The attachments to send
 * @returns {Message} The message that was sent
 */
export const sendMessage = async(
	channel: any,
	content: string | null = null,
	embeds: MessageEmbed | MessageEmbed[] | null = null,
	components: MessageActionRow | null = null,
	files: MessageAttachment | MessageAttachment[] | Object | Object[] | null = null,
	stickers: Sticker | Sticker[] | null = null,
	attachments: MessageAttachment | MessageAttachment[] | null = null
) => {
	const messageOptions: {[key: string]: any} = {};
	if(content) messageOptions["content"] = content;
	if(embeds) messageOptions["embeds"] = embeds;
	if(components) messageOptions["components"] = components;
	if(files) messageOptions["files"] = files;
	if(stickers) messageOptions["content"] = stickers;
	if(attachments) messageOptions["attachments"] = attachments;
	return await channel.send(messageOptions);
};

/**
 * @param {Message} message The message to reply to
 * @param {boolean} mention Whether or not to mention the author of the provided message
 * @param {string} content The text of the message
 * @param {MessageEmbed | MessageEmbed[]} embeds The embeds to send
 * @param {MessageActionRow} components The components of the message
 * @param {MessageAttachment | MessageAttachment[] | Object | Object[]} files The files to send
 * @param {Sticker | Sticker[]} stickers The stickers to send
 * @param {MessageAttachment | MessageAttachment[]} attachments The attachments to send
 * @returns {Message} The message that was sent
 */
export const replyToMessage = async(
	message: Message,
	mention: boolean = true,
	content: string | null = null,
	embeds: MessageEmbed | MessageEmbed[] | null = null,
	components: MessageActionRow | null = null,
	files: MessageAttachment | MessageAttachment[] | Object | Object[] | null = null,
	stickers: Sticker | Sticker[] | null = null,
	attachments: MessageAttachment | MessageAttachment[] | null = null
) => {
	const messageOptions: { [key: string]: any } = {
		allowedMentions: {
			repliedUser: mention
		}
	};
	if(content) messageOptions["content"] = content;
	if(embeds) messageOptions["embeds"] = embeds;
	if(components) messageOptions["components"] = components;
	if(files) messageOptions["files"] = files;
	if(stickers) messageOptions["content"] = stickers;
	if(attachments) messageOptions["attachments"] = attachments;
	return await message.reply(messageOptions);
};

/**
 * @param {Message} message The message to reply to
 * @param {boolean} mention Whether or not to mention the author of the provided message
 * @param {string} content The text of the message
 * @param {MessageEmbed | MessageEmbed[]} embeds The embeds to send
 * @param {MessageActionRow} components The components of the message
 * @param {MessageAttachment | MessageAttachment[] | Object | Object[]} files The files to send
 * @param {Sticker | Sticker[]} stickers The stickers to send
 * @param {MessageAttachment | MessageAttachment[]} attachments The attachments to send
 * @returns {Message} The message that was sent
 */
export const editMessage = async(
	message: Message,
	mention: boolean = true,
	content: string | null = null,
	embeds: MessageEmbed | MessageEmbed[] | null = null,
	components: MessageActionRow | null = null,
	files: MessageAttachment | MessageAttachment[] | Object | Object[] | null = null,
	stickers: Sticker | Sticker[] | null = null,
	attachments: MessageAttachment | MessageAttachment[] | null = null
) => {
	const messageOptions: { [key: string]: any } = {
		allowedMentions: {
			repliedUser: mention
		}
	};
	if(content) messageOptions["content"] = content;
	if(embeds) messageOptions["embeds"] = embeds;
	if(components) messageOptions["components"] = components;
	if(files) messageOptions["files"] = files;
	if(stickers) messageOptions["content"] = stickers;
	if(attachments) messageOptions["attachments"] = attachments;
	return await message.edit(messageOptions);
};

/**
 * @param {any} channel The variable to check
 * @returns {boolean} Whether or not the variable provided is a text channel
 */
export const isTextChannel = (channel: any) => {
	try {
		return channel.isText();
	} catch {
		return false;
	};
};