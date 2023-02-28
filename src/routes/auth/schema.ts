/**
 * @openapi
 * components:
 *   schemas:
 * 
 *     login:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             authToken:
 *               type: string
 *             user:
 *               $ref: '#/components/schemas/user'
 *     user: 
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         username:
 *           type: string
 *         name:
 *           type: string
 *         username:
 *           type: string
 */