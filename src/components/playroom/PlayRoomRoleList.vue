<template>
  <div class="fl-center" v-if="isGameStarted">
    <div
      v-for="role in usedRoles"
      :key="role.name"
      class="box-gray"
      :class="{'night': !isDay}"
    >
      <PlayRoomRoleListItem
        :name="role.name"
        :number="role.number"
        :img="role.img"
        :description="role.description"
      />
    </div>
  </div>
</template>

<script>
import PlayRoomRoleListItem from './PlayRoomRoleListItem';

export default {
  name: 'PlayRoomRoleList',
  props: ['playerNum', 'isDay'],
  components: {
    PlayRoomRoleListItem,
  },
  data() {
    return {
      roles: [
        {
          name: 'seer',
          number: 1,
          img: 'seer',
          description: 'Check a player to see whether he/she a wolf every night',
        },
        {
          name: 'guard',
          number: 1,
          img: 'guard',
          description: 'Protect 1 player every night but not the same one as the previous night',
        },
        {
          name: 'wolf',
          number: 2,
          img: 'wolf',
          description: 'Discuss with other wolves to kill 1 player every night',
        },
        {
          name: 'villager',
          number: 2,
          img: 'villager',
          description: 'Not wake up at night. No special abilities. Discuss with others to reveal the wolves',
        },
        {
          name: 'witch',
          number: 0,
          img: 'witch',
          description: 'Wake up every night. Can save 1 player from being killed by the wolves or kill another player in the whole game',
        },
        {
          name: 'hunter',
          number: 0,
          img: 'hunter',
          description: 'Not wake up at night. When killed, can choose another player to die with him/her',
        },
      ],
    };
  },
  computed: {
    usedRoles() {
      return this.roles.filter((role) => role.number > 0);
    },
  },
  mounted() {
    // decide used roles based on current number of players in the room
    if (this.playerNum > 6) {
      this.roles[3].number += 1;
    }
    if (this.playerNum > 7) {
      this.roles[4].number += 1;
    }
    if (this.playerNum > 8) {
      this.roles[3].number += 1;
    }
    if (this.playerNum > 9) {
      this.roles[2].number += 1;
    }
    if (this.playerNum > 10) {
      this.roles[5].number += 1;
    }
    if (this.playerNum > 11) {
      this.roles[3].number += 1;
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_base';

.fl-center {
  width: 100%;
  position: fixed;
  bottom: 0;
}

.box-gray {
  position: relative;
  width: 4rem;
  height: 4rem;
  border: 1px solid $orange;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: auto;
  flex-shrink: 0;
}

.night {
  border: 1px solid blue;
}

</style>
