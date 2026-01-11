import { PERMISSIONS } from './permissions.js'

export const ROLES = {
	/* =====================
	 * SUPER ADMIN
	 * ===================== */
	superadmin: Object.values(PERMISSIONS),
	// full power, god mode 👑

	/* =====================
	 * ADMIN
	 * ===================== */
	admin: [
		PERMISSIONS.DASHBOARD_VIEW,

		// Story
		PERMISSIONS.STORY_CREATE,
		PERMISSIONS.STORY_EDIT,
		PERMISSIONS.STORY_DELETE,
		PERMISSIONS.STORY_PUBLISH,
		PERMISSIONS.STORY_UNPUBLISH,

		// Comment
		PERMISSIONS.COMMENT_DELETE,
		PERMISSIONS.COMMENT_MODERATE,

		// Category & Tag
		PERMISSIONS.CATEGORY_CREATE,
		PERMISSIONS.CATEGORY_UPDATE,
		PERMISSIONS.CATEGORY_DELETE,
		PERMISSIONS.TAG_CREATE,
		PERMISSIONS.TAG_DELETE,

		// User
		PERMISSIONS.USER_VIEW,
		PERMISSIONS.USER_BAN,
		PERMISSIONS.USER_UNBAN,

		// Moderation
		PERMISSIONS.CONTENT_REVIEW,
		PERMISSIONS.CONTENT_TAKEDOWN,
	],

	/* =====================
	 * MODERATOR
	 * ===================== */
	moderator: [
		PERMISSIONS.STORY_READ_DRAFT,

		PERMISSIONS.COMMENT_DELETE,
		PERMISSIONS.COMMENT_MODERATE,

		PERMISSIONS.CONTENT_REVIEW,
		PERMISSIONS.CONTENT_TAKEDOWN,
	],

	// /* =====================
	//  * VERIFIED USER
	//  * ===================== */
	// verified_user: [
	// 	PERMISSIONS.PROFILE_VIEW,
	// 	PERMISSIONS.PROFILE_UPDATE,

	// 	PERMISSIONS.STORY_CREATE,
	// 	PERMISSIONS.STORY_EDIT,
	// 	PERMISSIONS.STORY_PUBLISH,

	// 	PERMISSIONS.COMMENT_CREATE,
	// 	PERMISSIONS.COMMENT_EDIT,
	// ],

	/* =====================
	 * REGULAR USER
	 * ===================== */
	user: [
		PERMISSIONS.PROFILE_VIEW,
		PERMISSIONS.PROFILE_UPDATE,

		PERMISSIONS.STORY_CREATE,
		PERMISSIONS.STORY_EDIT,
		PERMISSIONS.STORY_PUBLISH, // di v2 wajib verifikasi akun via email sebelum publish

		PERMISSIONS.COMMENT_CREATE,
		PERMISSIONS.COMMENT_EDIT,
	],

	/* =====================
	 * GUEST (optional)
	 * ===================== */
	guest: [],
}
