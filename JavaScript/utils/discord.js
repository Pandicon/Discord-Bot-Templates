const { GuildMember, MessageEmbed, MessageActionRow, MessageAttachment, Sticker, Message, PermissionString, TextChannel } = require("discord.js");
/**
 * @param {GuildMember} member The guild member
 * @param {PermissionString | PermissionString[]} permissions One permission/An array of permissions to check for
 * @param {GuildChannel} channel The channel to check in (optional)
 * @param {boolean} checkAdmin Allow the admin override (true by default) 
 * @returns {boolean} Whether or not the member has the permissions
 */
const memberHasPermissions = (
	member,
	permissions,
	channel = null,
	checkAdmin = true
) => {
	if(!member) return false;
	if(!permissions) return true;
	if(typeof permissions == "string") permissions = [permissions];
	const memberPermissions = channel != null ? member.permissionsIn(channel).toArray() : member.permissions.toArray();
	if(checkAdmin && memberPermissions.includes("ADMINISTRATOR")) return true;
	for(const permission of permissions) {
		if(!memberPermissions.includes(permission)) return false;
	};
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
const sendMessage = async(
	channel,
	content = null,
	embeds = null,
	components = null,
	files = null,
	stickers = null,
	attachments = null
) => {
	const messageOptions = {};
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
const replyToMessage = async(
	message,
	mention = true,
	content = null,
	embeds = null,
	components = null,
	files = null,
	stickers = null,
	attachments = null
) => {
	const messageOptions = {
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
const editMessage = async(
	message,
	mention = true,
	content = null,
	embeds = null,
	components = null,
	files = null,
	stickers = null,
	attachments = null
) => {
	const messageOptions = {
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
const isTextChannel = (channel) => {
	try {
		return channel.isText();
	} catch {
		return false;
	};
};

module.exports = {
	memberHasPermissions,
	sendMessage,
	replyToMessage,
	editMessage,
	isTextChannel
};