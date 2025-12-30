import { motion } from 'framer-motion';
import './VmPanel.css';

const VmPanel = ({ hosts = [] }) => {
  return (
    <motion.div
      className="vm-panel"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h3>Virtual Machines</h3>

      {hosts.length === 0 ? (
        <p className="vm-placeholder">
          No hypervisor hosts configured for this location.
        </p>
      ) : (
        hosts.map((host, hostIndex) => (
          <motion.div
            key={host.id}
            className="vm-host"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * hostIndex }}
          >
            <div className="vm-host-header">
              <span className="vm-host-name">{host.name}</span>
              <span className="vm-host-meta">
                {[host.model, host.ip].filter(Boolean).join(' | ')}
              </span>
            </div>

            {host.vms && host.vms.length > 0 && (
              <ul className="vm-list">
                {host.vms.map((vm, vmIndex) => (
                  <motion.li
                    key={vm.id || vmIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.05 * vmIndex }}
                  >
                    {[vm.name, vm.role, vm.os, vm.ip].filter(Boolean).join(' | ')}
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default VmPanel;
