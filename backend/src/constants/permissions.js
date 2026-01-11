export const PERMISSIONS = {
	/* =====================
	 * AUTH & ACCOUNT
	 * ===================== */
	AUTH_LOGIN: 'auth:login',
	AUTH_LOGOUT: 'auth:logout',
	AUTH_REFRESH: 'auth:refresh',

	PROFILE_VIEW: 'profile:view',
	PROFILE_UPDATE: 'profile:update',

	/* =====================
	 * STORY
	 * ===================== */
	STORY_CREATE: 'story:create',
	STORY_READ_DRAFT: 'story:read:draft',
	STORY_EDIT: 'story:edit',
	STORY_DELETE: 'story:delete',
	STORY_PUBLISH: 'story:publish',
	STORY_UNPUBLISH: 'story:unpublish',

	/* =====================
	 * COMMENT
	 * ===================== */
	COMMENT_CREATE: 'comment:create',
	COMMENT_EDIT: 'comment:edit',
	COMMENT_DELETE: 'comment:delete',
	COMMENT_MODERATE: 'comment:moderate',

	/* =====================
	 * CATEGORY & TAG
	 * ===================== */
	CATEGORY_CREATE: 'category:create',
	CATEGORY_UPDATE: 'category:update',
	CATEGORY_DELETE: 'category:delete',

	TAG_CREATE: 'tag:create',
	TAG_DELETE: 'tag:delete',

	/* =====================
	 * USER MANAGEMENT
	 * ===================== */
	USER_VIEW: 'user:view',
	USER_BAN: 'user:ban',
	USER_UNBAN: 'user:unban',
	USER_ROLE_UPDATE: 'user:role:update',

	/* =====================
	 * MODERATION
	 * ===================== */
	CONTENT_REVIEW: 'content:review',
	CONTENT_TAKEDOWN: 'content:takedown',

	/* =====================
	 * SYSTEM / ADMIN
	 * ===================== */
	DASHBOARD_VIEW: 'dashboard:view',
	SYSTEM_CONFIG_UPDATE: 'system:config:update',
}
