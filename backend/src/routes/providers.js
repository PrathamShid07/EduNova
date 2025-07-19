const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providerController');
const authMiddleware = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const upload = require('../middleware/fileUpload');
const { validateProvider } = require('../middleware/validation');

router.get('/', providerController.getProviders);
router.get('/:id', providerController.getProviderProfile);
router.post('/', authMiddleware, roleCheck('provider'), upload.single('logo'), validateProvider, providerController.createProviderProfile);
router.put('/:id', authMiddleware, roleCheck('provider'), upload.single('logo'), validateProvider, providerController.updateProviderProfile);
router.delete('/:id', authMiddleware, roleCheck('provider'), providerController.deleteProviderProfile);
router.get('/:id/events', providerController.getProviderEvents);
router.get('/:id/stats', authMiddleware, roleCheck('provider'), providerController.getProviderStats);

module.exports = router;